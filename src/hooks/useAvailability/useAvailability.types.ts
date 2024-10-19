import { components } from "../../api/octopus";

export type Availability = components["schemas"]["Availability"];

export type UseAvailabilityProps = {
  interval?: number;
};
