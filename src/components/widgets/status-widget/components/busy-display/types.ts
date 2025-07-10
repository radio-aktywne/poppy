import { CheckStreamAvailabilityOutput } from "../../../../../lib/octopus/check-stream-availability";

export type BusyDisplayInput = {
  event: NonNullable<CheckStreamAvailabilityOutput["event"]>;
};
