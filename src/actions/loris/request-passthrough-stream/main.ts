"use server";

import { LorisError } from "../../../lib/loris/errors";
import { requestPassthroughStream as internalRequestPassthroughStream } from "../../../lib/loris/request-passthrough-stream";
import {
  InvalidInputError,
  StreamNotAvailableError,
} from "../../../lib/loris/request-passthrough-stream/errors";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import {
  RequestPassthroughStreamInput,
  RequestPassthroughStreamOutput,
} from "./types";

export async function requestPassthroughStream(
  input: RequestPassthroughStreamInput,
): Promise<RequestPassthroughStreamOutput> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { port, stun } = await internalRequestPassthroughStream({
      codec: parsed.data.codec,
      format: parsed.data.format,
      srt: parsed.data.srt,
      stun: parsed.data.stun,
    });
    return { port: port, stun: stun };
  } catch (error) {
    if (error instanceof InvalidInputError)
      return { error: errors.invalidInput };
    if (error instanceof StreamNotAvailableError)
      return { error: errors.streamNotAvailable };
    if (error instanceof LorisError) return { error: errors.generic };
    throw error;
  }
}
