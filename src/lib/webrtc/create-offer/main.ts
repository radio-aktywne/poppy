import "client-only";
import merge from "lodash.merge";

import { defaultCodecsConfig } from "./constants";
import { CreateOfferInput, CreateOfferOutput } from "./types";
import {
  createCandidatesGatheredPromise,
  createLocalDescription,
  getOffer,
} from "./utils";

export async function createOffer({
  codecs,
  peer,
}: CreateOfferInput): Promise<CreateOfferOutput> {
  const mergedCodecsConfig = merge({}, defaultCodecsConfig, codecs);

  const candidatesGatheredPromise = createCandidatesGatheredPromise(peer);
  await createLocalDescription(peer, mergedCodecsConfig);
  await candidatesGatheredPromise;
  const offer = getOffer(peer);

  return { offer: offer };
}
