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
    iceCandidatePoolSize: constants.webrtc.ice.candidates.size,
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

export function createCandidatesPromise(peer: RTCPeerConnection) {
  return new Promise<void>((resolve) => {
    const timeouts = [] as ReturnType<typeof setTimeout>[];

    const removeTimeouts = () => {
      while (timeouts.length > 0) clearTimeout(timeouts.pop());
    };

    const cleanupAndResolve = () => {
      peer.removeEventListener("icegatheringstatechange", handleStateChange);
      peer.removeEventListener("icecandidate", handleCandidate);
      removeTimeouts();
      resolve();
    };

    const handleStateChange = () => {
      if (peer.iceGatheringState === "complete") cleanupAndResolve();
    };

    const handleCandidate = (event: RTCPeerConnectionIceEvent) => {
      if (!event.candidate) return cleanupAndResolve();

      switch (event.candidate.type) {
        case "host":
        case "srflx":
          removeTimeouts();
          timeouts.push(
            setTimeout(
              () => cleanupAndResolve(),
              constants.webrtc.ice.candidates.timeout,
            ),
          );
          break;
      }
    };

    peer.addEventListener("icegatheringstatechange", handleStateChange);
    peer.addEventListener("icecandidate", handleCandidate);
  });
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

export async function createOffer(peer: RTCPeerConnection) {
  const candidates = createCandidatesPromise(peer);

  const offer = await peer.createOffer();
  if (offer.sdp) offer.sdp = transformSessionDescription(offer.sdp);
  await peer.setLocalDescription(offer);

  await candidates;
}

export async function reserveStream(data: StreamReadyData) {
  await orpcClientSideClient.core.composites.reserveStreamWithPassthrough({
    bitrate: constants.audio.bitrate,
    channels: constants.audio.channels,
    codec: constants.audio.codec,
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

export function createConnectedPromise(peer: RTCPeerConnection) {
  return new Promise<void>((resolve) => {
    const handle = () => {
      switch (peer.connectionState) {
        case "connected":
          peer.removeEventListener("connectionstatechange", handle);
          resolve();
          break;
        case "failed":
          peer.removeEventListener("connectionstatechange", handle);
          throw new Error("Peer connection failed");
      }
    };

    peer.addEventListener("connectionstatechange", handle);
  });
}

export function addAnswerToPeer(peer: RTCPeerConnection, answer: string) {
  void peer.setRemoteDescription({ sdp: answer, type: "answer" });
}

export function getTimestamp() {
  return Math.floor(Date.now() / 1000);
}

export async function ready(data: StreamReadyingData) {
  const media = await getMedia();

  try {
    const peer = createPeer();

    try {
      addMediaToPeer(media, peer);
      await createOffer(peer);

      return {
        instance: data.instance,
        media: media,
        peer: peer,
        recording: data.recording,
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

export async function start(data: StreamReadyData) {
  await reserveStream(data);
  const offer = getOffer(data.peer);
  const { answer, session } = await createSession(offer);

  try {
    const connected = createConnectedPromise(data.peer);
    addAnswerToPeer(data.peer, answer);
    await connected;

    return {
      instance: data.instance,
      media: data.media,
      peer: data.peer,
      recording: data.recording,
      session: session,
      timestamp: getTimestamp(),
      title: data.title,
    };
  } catch (error) {
    await cleanupSession(session);
    throw error;
  }
}

export async function stop(data: StreamLiveData) {
  const cleanups = await Promise.allSettled(
    [
      async () => await cleanupSession(data.session),
      () => cleanupMedia(data.media),
      () => cleanupPeer(data.peer),
    ].map((fn) => Promise.try(fn)),
  );

  const failed = cleanups.filter((result) => result.status === "rejected");

  if (failed.length > 0)
    throw new AggregateError(
      failed.map((result) => result.reason as unknown),
      "Failed to clean up all resources",
    );
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
