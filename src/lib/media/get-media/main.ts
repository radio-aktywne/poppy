import "client-only";
import merge from "lodash.merge";

import { defaultConstraints } from "./constants";
import { GetMediaInput, GetMediaOutput } from "./types";

export async function getMedia({
  constraints,
}: GetMediaInput = {}): Promise<GetMediaOutput> {
  const mergedConstraints = merge({}, defaultConstraints, constraints);

  const media = await navigator.mediaDevices.getUserMedia({
    audio: mergedConstraints,
  });

  return { media: media };
}
