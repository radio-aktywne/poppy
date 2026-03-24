import { orpcContractRootBase } from "../../../../../../../bases/root";
import { Schemas } from "./schemas";

export const reserve = orpcContractRootBase
  .input(Schemas.Input)
  .output(Schemas.Output);
