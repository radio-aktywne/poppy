import { msg } from "@lingui/core/macro";

import {
  requestPassthroughStream,
  RequestPassthroughStreamSuccessOutput,
} from "../../actions/loris/request-passthrough-stream";
import { reserveStream } from "../../actions/octopus/reserve-stream";
import { createWHIPSession } from "../../actions/whip/create-whip-session";
import { deleteWHIPSession } from "../../actions/whip/delete-whip-session";
import { closeMedia } from "../../lib/media/close-media";
import { getMedia } from "../../lib/media/get-media";
import { addMedia } from "../../lib/webrtc/add-media";
import { closePeer } from "../../lib/webrtc/close-peer";
import { createConnectionPromise } from "../../lib/webrtc/create-connection-promise";
import { createOffer } from "../../lib/webrtc/create-offer";
import { createPeer } from "../../lib/webrtc/create-peer";
import { handleAnswer } from "../../lib/webrtc/handle-answer";
import { audioCodec, audioFormat } from "./constants";
import { UseStreamStartData } from "./types";

async function wrappedReserveStream(data: UseStreamStartData) {
  const { data: reserveStreamData, error } = await reserveStream({
    event: data.event,
    format: audioFormat,
    record: data.record,
  });

  if (error) return { error: msg({ message: "Failed to reserve stream" }) };

  return { data: reserveStreamData };
}

async function wrappedRequestPassthroughStream(
  password: string,
  host: string,
  port: number,
) {
  const { data, error } = await requestPassthroughStream({
    codec: audioCodec,
    format: audioFormat,
    srt: {
      host: host,
      password: password,
      port: port,
    },
  });

  if (error)
    return { error: msg({ message: "Failed to request passthrough stream" }) };

  return { data: data };
}

export function wrappedCreatePeer(
  stun: RequestPassthroughStreamSuccessOutput["data"]["stun"],
) {
  return createPeer({
    config: { iceServers: [{ urls: `stun:${stun.host}:${stun.port}` }] },
  });
}

export async function wrappedCreateWHIPSession(offer: string) {
  const { data, error } = await createWHIPSession({ offer: offer });

  if (error)
    return { error: msg({ message: "Failed to create WHIP session" }) };

  return { data: data };
}

export async function setupStreams(data: UseStreamStartData) {
  const { data: reserveStreamData, error: reserveStreamError } =
    await wrappedReserveStream(data);

  if (reserveStreamError) return { error: reserveStreamError };

  const {
    data: requestPassthroughStreamData,
    error: requestPassthroughStreamError,
  } = await wrappedRequestPassthroughStream(
    reserveStreamData.credentials.token,
    data.target.host,
    data.target.port,
  );

  if (requestPassthroughStreamError)
    return { error: requestPassthroughStreamError };

  return { stun: requestPassthroughStreamData.stun };
}

export async function setupPeer(peer: RTCPeerConnection, media: MediaStream) {
  const { promise: connectionPromise } = createConnectionPromise({
    peer: peer,
  });

  addMedia({ media: media, peer: peer });

  const { offer } = await createOffer({ peer: peer });

  const { data: createWHIPSessionData, error: createWHIPSessionError } =
    await wrappedCreateWHIPSession(offer);

  if (createWHIPSessionError) return { error: createWHIPSessionError };

  handleAnswer({ answer: createWHIPSessionData.answer, peer: peer });

  const connected = await connectionPromise;

  if (!connected) {
    await deleteWHIPSession({ session: createWHIPSessionData.session });
    return { error: msg({ message: "Stream connection failed" }) };
  }

  return { session: createWHIPSessionData.session };
}

export async function startStream(data: UseStreamStartData) {
  const { media } = await getMedia();

  const { error: setupStreamsError, stun } = await setupStreams(data);

  if (setupStreamsError) {
    closeMedia({ media: media });
    return { error: setupStreamsError };
  }

  const { peer } = wrappedCreatePeer(stun);

  const { error: setupPeerError, session } = await setupPeer(peer, media);

  if (setupPeerError) {
    closeMedia({ media: media });
    closePeer({ peer: peer });
    return { error: setupPeerError };
  }

  return { media: media, peer: peer, session: session };
}

export async function stopStream(
  media: MediaStream,
  peer: RTCPeerConnection,
  session: string,
) {
  await deleteWHIPSession({ session: session });

  closeMedia({ media: media });
  closePeer({ peer: peer });
}
