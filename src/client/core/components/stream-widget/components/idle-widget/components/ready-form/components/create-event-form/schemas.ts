import * as z from "zod";

export const Schemas = {
  Values: z.object({
    end: z
      .string()
      .pipe(z.transform((value) => value.replace(" ", "T")))
      .pipe(z.iso.datetime({ local: true })),
    start: z
      .string()
      .pipe(z.transform((value) => value.replace(" ", "T")))
      .pipe(z.iso.datetime({ local: true })),
  }),
};
