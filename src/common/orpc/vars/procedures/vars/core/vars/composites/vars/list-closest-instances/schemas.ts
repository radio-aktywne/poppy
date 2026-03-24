import * as z from "zod";

import {
  EventInstanceSchema,
  ListRequestEndSchema,
  ListRequestStartSchema,
  ScheduleModelsEventSchema,
  ScheduleModelsListRequestWhereSchema,
} from "../../../../../../../../../apis/beaver/schemas";

export const Schemas = {
  Input: z
    .object({
      end: ListRequestEndSchema.optional(),
      order: z.enum(["asc", "desc"]).default("asc"),
      reference: z.iso.datetime({ local: true }).optional(),
      start: ListRequestStartSchema.optional(),
      where: ScheduleModelsListRequestWhereSchema.optional(),
    })
    .prefault({}),
  Output: z.object({
    results: z
      .object({
        event: z.object({
          ...ScheduleModelsEventSchema.omit({ show: true }).shape,
          show: ScheduleModelsEventSchema.shape.show
            .unwrap()
            .omit({ events: true }),
        }),
        instance: EventInstanceSchema,
      })
      .array(),
  }),
};
