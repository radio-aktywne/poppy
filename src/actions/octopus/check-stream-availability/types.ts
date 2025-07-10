import { MessageDescriptor } from "@lingui/core";

import { CheckStreamAvailabilityOutput as InternalCheckStreamAvailabilityOutput } from "../../../lib/octopus/check-stream-availability";

export type CheckStreamAvailabilityInput = {
  [key: string]: never;
};

export type CheckStreamAvailabilitySuccessOutput = {
  data: InternalCheckStreamAvailabilityOutput;
  error?: never;
};

export type CheckStreamAvailabilityErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type CheckStreamAvailabilityOutput =
  | CheckStreamAvailabilityErrorOutput
  | CheckStreamAvailabilitySuccessOutput;
