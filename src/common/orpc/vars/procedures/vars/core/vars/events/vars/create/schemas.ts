import * as z from "zod";

import {
  EventsCreateRequestSchema,
  EventsCreateResponseSchema,
} from "../../../../../../../../../apis/beaver/schemas";

export const Schemas = {
  Input: z.object({
    ...EventsCreateRequestSchema.shape.query.unwrap().shape,
    data: EventsCreateRequestSchema.shape.body,
  }),
  Output: EventsCreateResponseSchema,
};
