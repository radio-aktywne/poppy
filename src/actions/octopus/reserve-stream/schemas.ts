import { z } from "zod";

export const inputSchema = z.object({
  event: z.string(),
  format: z.enum(["ogg"]),
  record: z.boolean(),
});
