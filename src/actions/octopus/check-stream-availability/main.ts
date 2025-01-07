"use server";

import { getSession } from "../../../lib/auth/get-session";
import { checkStreamAvailability as internalCheckStreamAvailability } from "../../../lib/octopus/check-stream-availability";
import { OctopusError } from "../../../lib/octopus/errors";
import { errors } from "./constants";
import {
  CheckStreamAvailabilityInput,
  CheckStreamAvailabilityOutput,
} from "./types";

export async function checkStreamAvailability({}: CheckStreamAvailabilityInput = {}): Promise<CheckStreamAvailabilityOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  try {
    const { checkedAt, event } = await internalCheckStreamAvailability();
    return { checkedAt: checkedAt, event: event };
  } catch (error) {
    if (error instanceof OctopusError) return { error: errors.generic };
    throw error;
  }
}
