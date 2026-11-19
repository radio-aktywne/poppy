import * as z from "zod";

export const Schemas = {
  Input: z.object({
    end: z.codec(
      z.string().nullable(),
      z.iso.datetime({ local: true }).optional(),
      {
        decode: (value) => value?.replace(" ", "T") ?? undefined,
        encode: (value) => value?.replace("T", " ") ?? null,
      },
    ),
    show: z.codec(z.string().nullable(), z.string().nullish(), {
      decode: (value) => value ?? undefined,
      encode: (value) => value ?? null,
    }),
    start: z.codec(
      z.string().nullable(),
      z.iso.datetime({ local: true }).optional(),
      {
        decode: (value) => value?.replace(" ", "T") ?? undefined,
        encode: (value) => value?.replace("T", " ") ?? null,
      },
    ),
  }),
  Output: z.object({
    end: z
      .string()
      .nullable()
      .pipe(
        z
          .string()
          .transform((value) => value.replace(" ", "T"))
          .pipe(z.iso.datetime({ local: true })),
      ),
    show: z.string().nullable(),
    start: z
      .string()
      .nullable()
      .pipe(
        z
          .string()
          .transform((value) => value.replace(" ", "T"))
          .pipe(z.iso.datetime({ local: true })),
      ),
  }),
};
