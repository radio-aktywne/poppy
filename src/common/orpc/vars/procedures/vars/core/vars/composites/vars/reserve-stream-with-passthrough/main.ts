import { orpcContractRootBase } from "../../../../../../../bases/root";
import { Schemas } from "./schemas";

export const reserveStreamWithPassthrough = orpcContractRootBase
  .input(Schemas.Input)
  .output(Schemas.Output);
