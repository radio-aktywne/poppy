import "server-only";

import { octopus } from "../../../services/octopus";
import { OctopusError } from "../errors";
import {
  CheckStreamAvailabilityInput,
  CheckStreamAvailabilityOutput,
} from "./types";

export async function checkStreamAvailability({}: CheckStreamAvailabilityInput = {}): Promise<CheckStreamAvailabilityOutput> {
  const { data, error, response } = await octopus.GET("/check");

  if (error || !response.ok) throw new OctopusError();

  return { checkedAt: data.checkedAt, event: data.event };
}
