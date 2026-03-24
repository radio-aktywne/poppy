import * as z from "zod";

export const Schemas = {
  Values: z.object({
    record: z.boolean(),
    show: z.string().nullish(),
  }),
};
