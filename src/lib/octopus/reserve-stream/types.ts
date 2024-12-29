import { components } from "../../../services/octopus";

export type ReserveStreamInput = {
  event: components["schemas"]["ReserveRequestData"]["event"];
  format: components["schemas"]["ReserveRequestData"]["format"];
  record: components["schemas"]["ReserveRequestData"]["record"];
};

export type ReserveStreamOutput = {
  credentials: components["schemas"]["ReserveResponseData"]["credentials"];
  port: components["schemas"]["ReserveResponseData"]["port"];
};
