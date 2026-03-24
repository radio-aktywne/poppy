import * as z from "zod";

import {
  StreamStreamRequestSchema,
  StreamStreamResponseSchema,
} from "../../../../../../../../../apis/loris/schemas";
import { ReserveReserveRequestSchema } from "../../../../../../../../../apis/octopus/schemas";

export const Schemas = {
  Input: z.object({
    codec: StreamStreamRequestSchema.shape.body.shape.codec.unwrap(),
    event: ReserveReserveRequestSchema.shape.body.shape.event,
    format: z.intersection(
      ReserveReserveRequestSchema.shape.body.shape.format.unwrap(),
      StreamStreamRequestSchema.shape.body.shape.format.unwrap(),
    ),
    record: ReserveReserveRequestSchema.shape.body.shape.record,
    stun: StreamStreamRequestSchema.shape.body.shape.stun,
  }),
  Output: z.object({
    stun: StreamStreamResponseSchema.shape.stun,
  }),
};
