import "server-only";

import { octopus } from "../../../services/octopus";
import { OctopusError } from "../errors";
import { InvalidInputError, StreamReservedError } from "./errors";
import { ReserveStreamInput, ReserveStreamOutput } from "./types";

export async function reserveStream({
  event,
  format,
  record,
}: ReserveStreamInput): Promise<ReserveStreamOutput> {
  const { data, error, response } = await octopus.POST("/reserve", {
    body: {
      event: event,
      format: format,
      record: record,
    },
  });

  if (error || !response.ok) {
    if (response.status === 400) throw new InvalidInputError();
    if (response.status === 409) throw new StreamReservedError();
    if (response.status === 422) throw new InvalidInputError();
    throw new OctopusError();
  }

  return { credentials: data.credentials, port: data.port };
}
