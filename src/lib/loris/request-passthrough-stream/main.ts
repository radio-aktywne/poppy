import "server-only";

import { loris } from "../../../services/loris";
import { LorisError } from "../errors";
import { InvalidInputError, StreamNotAvailableError } from "./errors";
import {
  RequestPassthroughStreamInput,
  RequestPassthroughStreamOutput,
} from "./types";

export async function requestPassthroughStream({
  codec,
  format,
  srt,
  stun,
}: RequestPassthroughStreamInput): Promise<RequestPassthroughStreamOutput> {
  const { data, error, response } = await loris.POST("/stream", {
    body: {
      codec: codec,
      format: format,
      srt: srt,
      stun: stun,
    },
  });

  if (error || !response.ok) {
    if (response.status === 400) throw new InvalidInputError();
    if (response.status === 409) throw new StreamNotAvailableError();
    throw new LorisError();
  }

  return { port: data.port, stun: data.stun };
}
