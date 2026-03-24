import * as z from "zod";

import {
  CreateSessionRequestSchema,
  CreateSessionResponseSchema,
} from "../../../../../../../../../apis/whip/schemas";

export const Schemas = {
  Input: CreateSessionRequestSchema.shape.body,
  Output: z.object({
    answer: CreateSessionResponseSchema,
    session: z.string(),
  }),
};
