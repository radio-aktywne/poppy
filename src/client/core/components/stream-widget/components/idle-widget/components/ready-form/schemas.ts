import * as z from "zod";

export const Schemas = {
  Values: z.object({
    instance: z.string().nullish(),
    record: z.boolean(),
    title: z.string().nullish(),
  }),
};
