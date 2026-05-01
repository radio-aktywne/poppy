import * as z from "zod";

import {
  StreamStreamRequestSchema,
  StreamStreamResponseSchema,
} from "../../../../../../../../../apis/loris/schemas";
import { ReserveReserveRequestSchema } from "../../../../../../../../../apis/octopus/schemas";

export const Schemas = {
  Input: z.object({
    ...ReserveReserveRequestSchema.shape.body.omit({
      format: true,
      metadata: true,
    }).shape,
    ...StreamStreamRequestSchema.shape.body.omit({
      codec: true,
      format: true,
      srt: true,
    }).shape,
    codec: StreamStreamRequestSchema.shape.body.shape.codec.unwrap(),
    format: z.intersection(
      ReserveReserveRequestSchema.shape.body.shape.format.unwrap(),
      StreamStreamRequestSchema.shape.body.shape.format.unwrap(),
    ),
  }),
  Output: z.object({
    stun: StreamStreamResponseSchema.shape.stun,
  }),
};
