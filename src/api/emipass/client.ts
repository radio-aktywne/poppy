import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

export const emipass = createClient<paths>({
  baseUrl: process.env.EMIWEB__EMIPASS__HTTP__URL || "http://localhost:11000",
});
