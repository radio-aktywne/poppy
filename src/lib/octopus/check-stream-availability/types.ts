import { components } from "../../../services/octopus";

export type CheckStreamAvailabilityInput = {
  [key: string]: never;
};

export type CheckStreamAvailabilityOutput = {
  checkedAt: components["schemas"]["Availability"]["checkedAt"];
  event: components["schemas"]["Availability"]["event"];
};
