import { z } from "zod";

export const inputSchema = z.object({
  codec: z.enum(["opus"]),
  format: z.enum(["ogg"]),
  srt: z.object({
    host: z.string(),
    password: z.string().nullable().optional(),
    port: z.number(),
  }),
  stun: z
    .object({
      host: z.string(),
      port: z.number(),
    })
    .nullable()
    .optional(),
});
