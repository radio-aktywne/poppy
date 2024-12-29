import "client-only";
import merge from "lodash.merge";

import { defaultConfig } from "./constants";
import { CreatePeerInput, CreatePeerOutput } from "./types";

export function createPeer({ config }: CreatePeerInput = {}): CreatePeerOutput {
  const mergedConfig = merge({}, defaultConfig, config);

  const peer = new RTCPeerConnection(mergedConfig);

  return { peer: peer };
}
