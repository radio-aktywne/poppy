import { SDPInfo } from "semantic-sdp";

import { CreateOfferCodecsConfig } from "./types";

export function createCandidatesGatheredPromise(
  peer: RTCPeerConnection,
): Promise<void> {
  return new Promise<void>((resolve) => {
    const handleStateChange = () => {
      if (peer.iceGatheringState === "complete") {
        peer.removeEventListener("icegatheringstatechange", handleStateChange);
        resolve();
      }
    };

    const handleCandidate = () => {
      peer.removeEventListener("icecandidate", handleCandidate);
      setTimeout(() => resolve(), 1000);
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
