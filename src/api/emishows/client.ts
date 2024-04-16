import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

export const emishows = createClient<paths>({
  baseUrl: process.env.EMIWEB__EMISHOWS__HTTP__URL || "http://localhost:35000",
});
