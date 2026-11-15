import * as z from "zod";

export const Schemas = {
  Input: z.object({
    force: z.codec(z.boolean(), z.boolean().optional(), {
      decode: (value) => value,
      encode: (value) => value ?? false,
    }),
    instance: z.codec(z.string().nullable(), z.string().nullish(), {
      decode: (value) => value ?? undefined,
      encode: (value) => value ?? null,
    }),
    record: z.codec(z.boolean(), z.boolean().optional(), {
      decode: (value) => value,
      encode: (value) => value ?? false,
    }),
    start: z.codec(z.boolean(), z.enum(["hard", "soft"]).optional(), {
      decode: (value) => (value ? "soft" : "hard"),
      encode: (value) => value === "soft",
    }),
    title: z.codec(z.string(), z.string().optional(), {
      decode: (value) => value || undefined,
      encode: (value) => value ?? "",
    }),
  }),
  Output: z.object({
    force: z.boolean(),
    instance: z.string().nullable().pipe(z.string().min(1)),
    record: z.boolean(),
    start: z.boolean().transform((value) => (value ? "soft" : "hard")),
    title: z.string().pipe(z.string().min(1)),
  }),
};
