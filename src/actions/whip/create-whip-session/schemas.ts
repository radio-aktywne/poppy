import { z } from "zod";

export const inputSchema = z.object({
  offer: z.string(),
});
