import * as z from "zod";

import {
  InstanceSchema,
  InstancesModelsListRequestWhereSchema,
  ListRequestEndSchema,
  ListRequestStartSchema,
} from "../../../../../../../../../apis/beaver/schemas";

export const Schemas = {
  Input: z
    .object({
      end: ListRequestEndSchema.optional(),
      order: z.enum(["asc", "desc"]).default("asc"),
      reference: z.iso.datetime().optional(),
      start: ListRequestStartSchema.optional(),
      where: InstancesModelsListRequestWhereSchema.optional(),
    })
    .prefault({}),
  Output: z.object({
    instances: z
      .object({
        ...InstanceSchema.omit({ event: true }).shape,
        event: z.object({
          ...InstanceSchema.shape.event.unwrap().omit({ show: true }).shape,
          show: InstanceSchema.shape.event.unwrap().shape.show.unwrap(),
        }),
      })
      .array(),
  }),
};
