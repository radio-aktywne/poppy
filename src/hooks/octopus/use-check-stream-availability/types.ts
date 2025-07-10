import { MessageDescriptor } from "@lingui/core";

import { CheckStreamAvailabilityOutput } from "../../../lib/octopus/check-stream-availability";

export type UseCheckStreamAvailabilityInput = {
  interval?: number;
};

export type UseCheckStreamAvailabilityLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseCheckStreamAvailabilityErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseCheckStreamAvailabilitySuccessState = {
  data: CheckStreamAvailabilityOutput;
  error?: never;
  loading: false;
};

export type UseCheckStreamAvailabilityState =
  | UseCheckStreamAvailabilityErrorState
  | UseCheckStreamAvailabilityLoadingState
  | UseCheckStreamAvailabilitySuccessState;

export type UseCheckStreamAvailabilityOutput = {
  refresh: () => Promise<void>;
} & UseCheckStreamAvailabilityState;
