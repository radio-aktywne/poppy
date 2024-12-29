import { MessageDescriptor } from "@lingui/core";

import { CheckStreamAvailabilityOutput as InternalCheckStreamAvailabilityOutput } from "../../../lib/octopus/check-stream-availability";

export type CheckStreamAvailabilityInput = {
  [key: string]: never;
};

export type CheckStreamAvailabilitySuccessOutput = {
  checkedAt: InternalCheckStreamAvailabilityOutput["checkedAt"];
  error?: never;
  event: InternalCheckStreamAvailabilityOutput["event"];
};

export type CheckStreamAvailabilityErrorOutput = {
  checkedAt?: never;
  error: MessageDescriptor;
  event?: never;
};

export type CheckStreamAvailabilityOutput =
  | CheckStreamAvailabilityErrorOutput
  | CheckStreamAvailabilitySuccessOutput;
