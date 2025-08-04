import { z } from "zod";

export const inputSchema = z.object({
  session: z.string(),
});
