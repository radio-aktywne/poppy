import { debounce } from "es-toolkit/function";
import { SDPInfo } from "semantic-sdp";

import type {
  StreamLiveData,
  StreamReadyData,
  StreamReadyingData,
} from "../../../../isomorphic/state/types";

import { dayjs } from "../../../../common/dates/vars/dayjs";
import { orpcClientSideClient } from "../../../orpc/vars/clients";
import { constants } from "./constants";

export async function getMedia() {
  return await navigator.mediaDevices.getUserMedia({
    audio: {
      autoGainControl: false,
      channelCount: constants.audio.channels,
      echoCancellation: false,
      noiseSuppression: false,
      sampleRate: constants.audio.samplerate,
      sampleSize: 16,
    },
  });
}

export function cleanupMedia(media: MediaStream) {
  media.getTracks().forEach((track) => track.stop());
}

export function createPeer() {
  return new RTCPeerConnection({
    iceCandidatePoolSize: constants.webrtc.ice.pool.size,
    iceServers: [
      {
        urls: `stun:${constants.webrtc.ice.server.host}:${constants.webrtc.ice.server.port}`,
      },
    ],
  });
}

export function cleanupPeer(peer: RTCPeerConnection) {
  peer.close();
}

export function addMediaToPeer(media: MediaStream, peer: RTCPeerConnection) {
  media
    .getTracks()
    .forEach((track) => peer.addTransceiver(track, { direction: "sendonly" }));
}

export function transformSessionDescription(sdp: string) {
  const parsed = SDPInfo.parse(sdp);
  for (const media of parsed.getMedias()) {
    for (const codec of media.getCodecs().values()) {
      if (codec.getCodec() === constants.audio.codec)
        codec.addParams({
          maxaveragebitrate: constants.audio.bitrate.toString(),
        });
    }
  }

  return parsed.toString();
}

export function waitForCandidates(
  peer: RTCPeerConnection,
  signal: AbortSignal,
) {
  return new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      peer.removeEventListener("icegatheringstatechange", handleStateChange);
      peer.removeEventListener("icecandidate", handleCandidate);
      signal.removeEventListener("abort", handleAbort);
      finish.cancel();
      clearTimeout(deadline);
    };

    const finish = debounce(() => {
      cleanup();
      resolve();
    }, constants.webrtc.ice.gathering.delay);

    const handleAbort = () => {
      cleanup();
      reject(new Error("ICE gathering cancelled"));
    };

    const handleStateChange = () => {
      switch (peer.iceGatheringState) {
        case "complete":
          cleanup();
          resolve();
          break;
      }
    };

    const handleCandidate = (event: RTCPeerConnectionIceEvent) => {
      switch (event.candidate?.type) {
        case "host":
        case "srflx":
          finish();
          break;
      }
    };

    const deadline = setTimeout(() => {
      cleanup();
      reject(new Error("ICE gathering timed out"));
    }, constants.webrtc.ice.gathering.timeout);

    peer.addEventListener("icegatheringstatechange", handleStateChange);
    peer.addEventListener("icecandidate", handleCandidate);
    signal.addEventListener("abort", handleAbort, { once: true });

    if (signal.aborted) handleAbort();
    else handleStateChange();
  });
}

export async function createOffer(peer: RTCPeerConnection) {
  const offer = await peer.createOffer();
  if (offer.sdp) offer.sdp = transformSessionDescription(offer.sdp);

  const controller = new AbortController();
  try {
    await Promise.all([
      waitForCandidates(peer, controller.signal),
      Promise.try(() => peer.setLocalDescription(offer)),
    ]);
  } finally {
    controller.abort();
  }
}

export async function reserveStream(data: StreamReadyData) {
  await orpcClientSideClient.core.composites.reserveStreamWithPassthrough({
    bitrate: constants.audio.bitrate,
    channels: constants.audio.channels,
    codec: constants.audio.codec,
    force: data.force,
    format: constants.audio.format,
    instance: {
      event: data.instance.event,
      start: data.instance.start,
    },
    metadata: {
      title: data.title,
    },
    record: data.recording,
    samplerate: constants.audio.samplerate,
    start: data.start,
    webrtc: {
      latency: dayjs
        .duration({ milliseconds: constants.webrtc.latency })
        .toISOString(),
      stun: {
        host: constants.webrtc.ice.server.host,
        port: constants.webrtc.ice.server.port,
      },
    },
  });
}

export function getOffer(peer: RTCPeerConnection) {
  return peer.localDescription!.sdp;
}

export async function createSession(offer: string) {
  return await orpcClientSideClient.core.whip.create(offer);
}

export async function cleanupSession(session: string) {
  await orpcClientSideClient.core.whip.delete({ session: session });
}

export async function addAnswerToPeer(peer: RTCPeerConnection, answer: string) {
  await peer.setRemoteDescription({ sdp: answer, type: "answer" });
}

export function waitForConnection(peer: RTCPeerConnection) {
  return new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      peer.removeEventListener("connectionstatechange", handle);
      clearTimeout(timeout);
    };

    const handle = () => {
      switch (peer.connectionState) {
        case "closed":
        case "failed":
          cleanup();
          reject(new Error(`Peer connection ${peer.connectionState}`));
          break;
        case "connected":
          cleanup();
          resolve();
          break;
      }
    };

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Peer connection timed out"));
    }, constants.webrtc.connection.timeout);

    peer.addEventListener("connectionstatechange", handle);
    handle();
  });
}

export function validateStream(data: StreamReadyData) {
  if (data.peer.connectionState !== "connected")
    throw new Error("Peer connection is not connected");

  if (data.media.getAudioTracks().some((track) => track.readyState === "ended"))
    throw new Error("Audio track ended");
}

export function getTimestamp() {
  return Math.floor(Date.now() / 1000);
}

export function monitor(data: StreamReadyData, onFailure: () => Promise<void>) {
  const tracks = data.media.getAudioTracks();

  const handleStateChange = () => {
    switch (data.peer.connectionState) {
      case "closed":
      case "failed":
        void onFailure();
        break;
    }
  };

  data.peer.addEventListener("connectionstatechange", handleStateChange);
  tracks.forEach((track) => track.addEventListener("ended", onFailure));

  return () => {
    data.peer.removeEventListener("connectionstatechange", handleStateChange);
    tracks.forEach((track) => track.removeEventListener("ended", onFailure));
  };
}

export async function ready(data: StreamReadyingData) {
  const media = await getMedia();

  try {
    const peer = createPeer();

    try {
      addMediaToPeer(media, peer);
      await createOffer(peer);

      return {
        force: data.force,
        instance: data.instance,
        media: media,
        peer: peer,
        recording: data.recording,
        start: data.start,
        title: data.title,
      };
    } catch (error) {
      cleanupPeer(peer);
      throw error;
    }
  } catch (error) {
    cleanupMedia(media);
    throw error;
  }
}

export async function stop(data: StreamLiveData) {
  const cleanups = await Promise.allSettled(
    [
      () => data.unsubscribe(),
      () => cleanupMedia(data.media),
      () => cleanupPeer(data.peer),
      async () => await cleanupSession(data.session),
    ].map((fn) => Promise.try(fn)),
  );

  const failed = cleanups.filter((result) => result.status === "rejected");

  if (failed.length > 0)
    throw new AggregateError(
      failed.map((result) => result.reason as unknown),
      "Failed to clean up all resources",
    );
}

export async function start(
  data: StreamReadyData,
  onFailure: () => Promise<void>,
) {
  await reserveStream(data);
  const offer = getOffer(data.peer);
  const { answer, session } = await createSession(offer);

  try {
    await addAnswerToPeer(data.peer, answer);
    await waitForConnection(data.peer);

    validateStream(data);

    return {
      force: data.force,
      instance: data.instance,
      media: data.media,
      peer: data.peer,
      recording: data.recording,
      session: session,
      start: data.start,
      timestamp: getTimestamp(),
      title: data.title,
      unsubscribe: monitor(data, onFailure),
    };
  } catch (error) {
    await cleanupSession(session);
    throw error;
  }
}

export async function unready(data: StreamReadyData) {
  const cleanups = await Promise.allSettled(
    [() => cleanupMedia(data.media), () => cleanupPeer(data.peer)].map((fn) =>
      Promise.try(fn),
    ),
  );

  const failed = cleanups.filter((result) => result.status === "rejected");

  if (failed.length > 0)
    throw new AggregateError(
      failed.map((result) => result.reason as unknown),
      "Failed to clean up all resources",
    );
}
