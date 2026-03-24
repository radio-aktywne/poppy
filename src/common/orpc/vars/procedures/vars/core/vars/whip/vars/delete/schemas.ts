import * as z from "zod";

import { DeleteSessionRequestSchema } from "../../../../../../../../../apis/whip/schemas";

export const Schemas = {
  Input: DeleteSessionRequestSchema.shape.path,
  Output: z.void(),
};
