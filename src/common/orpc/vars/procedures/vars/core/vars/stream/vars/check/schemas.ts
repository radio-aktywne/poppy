import * as z from "zod";

import { CheckCheckResponseSchema } from "../../../../../../../../../apis/octopus/schemas";

export const Schemas = {
  Input: z.undefined(),
  Output: CheckCheckResponseSchema,
};
