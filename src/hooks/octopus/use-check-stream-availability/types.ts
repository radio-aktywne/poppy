import { MessageDescriptor } from "@lingui/core";

import { CheckStreamAvailabilityOutput } from "../../../lib/octopus/check-stream-availability";

export type UseCheckStreamAvailabilityInput = {
  interval?: number;
};

export type UseCheckStreamAvailabilityLoadingState = {
  checkedAt?: never;
  error?: never;
  event?: never;
  loading: true;
};

export type UseCheckStreamAvailabilityErrorState = {
  checkedAt?: never;
  error: MessageDescriptor;
  event?: never;
  loading: false;
};

export type UseCheckStreamAvailabilitySuccessState = {
  checkedAt: CheckStreamAvailabilityOutput["checkedAt"];
  error?: never;
  event: CheckStreamAvailabilityOutput["event"];
  loading: false;
};

export type UseCheckStreamAvailabilityState =
  | UseCheckStreamAvailabilityErrorState
  | UseCheckStreamAvailabilityLoadingState
  | UseCheckStreamAvailabilitySuccessState;

export type UseCheckStreamAvailabilityOutput = {
  refresh: () => Promise<void>;
} & UseCheckStreamAvailabilityState;
