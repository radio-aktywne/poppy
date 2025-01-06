"use server";

import { auth } from "../../../auth";
import { OctopusError } from "../../../lib/octopus/errors";
import { reserveStream as internalReserveStream } from "../../../lib/octopus/reserve-stream";
import {
  InvalidInputError,
  StreamReservedError,
} from "../../../lib/octopus/reserve-stream/errors";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { ReserveStreamInput, ReserveStreamOutput } from "./types";

export async function reserveStream(
  input: ReserveStreamInput,
): Promise<ReserveStreamOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { credentials, port } = await internalReserveStream({
      event: parsed.data.event,
      format: parsed.data.format,
      record: parsed.data.record,
    });
    return { credentials: credentials, port: port };
  } catch (error) {
    if (error instanceof InvalidInputError)
      return { error: errors.invalidInput };
    if (error instanceof StreamReservedError)
      return { error: errors.streamReserved };
    if (error instanceof OctopusError) return { error: errors.generic };
    throw error;
  }
}
