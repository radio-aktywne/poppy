import { components } from "../../api/emistream";

export type Availability = components["schemas"]["Availability"];

export type UseAvailabilityProps = {
  interval?: number;
};
