import { SDPInfo } from "semantic-sdp";

import { CreateOfferCodecsConfig } from "./types";

export function createCandidatesGatheredPromise(
  peer: RTCPeerConnection,
): Promise<void> {
  return new Promise<void>((resolve) => {
    const timeouts = [] as NodeJS.Timeout[];

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
          timeouts.push(setTimeout(() => cleanupAndResolve(), 250));
          break;
      }
    };

    peer.addEventListener("icegatheringstatechange", handleStateChange);
    peer.addEventListener("icecandidate", handleCandidate);
  });
}

function configureSDP(sdp: string, codecs: CreateOfferCodecsConfig): string {
  const parsed = SDPInfo.parse(sdp);
  for (const media of parsed.getMedias()) {
    for (const codec of media.getCodecs().values()) {
      const properties = codecs[codec.getCodec()];
      if (properties !== undefined) codec.addParams(properties);
    }
  }

  return parsed.toString();
}

export async function createLocalDescription(
  peer: RTCPeerConnection,
  codecs: CreateOfferCodecsConfig,
): Promise<void> {
  const offer = await peer.createOffer();

  if (offer.sdp !== undefined) {
    offer.sdp = configureSDP(offer.sdp, codecs);
  }

  await peer.setLocalDescription(offer);
}

export function getOffer(peer: RTCPeerConnection): string {
  return peer.localDescription!.sdp;
}
