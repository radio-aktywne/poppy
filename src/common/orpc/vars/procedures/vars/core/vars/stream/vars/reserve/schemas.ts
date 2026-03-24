import {
  ReserveReserveRequestSchema,
  ReserveReserveResponseSchema,
} from "../../../../../../../../../apis/octopus/schemas";

export const Schemas = {
  Input: ReserveReserveRequestSchema.shape.body,
  Output: ReserveReserveResponseSchema,
};
