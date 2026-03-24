import { orpcContractRootBase } from "../../../../../../../bases/root";
import { Schemas } from "./schemas";

export const check = orpcContractRootBase
  .input(Schemas.Input)
  .output(Schemas.Output);
