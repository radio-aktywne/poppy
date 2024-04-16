import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

export const whip = createClient<paths>({
  baseUrl: process.env.EMIWEB__EMIPASS__WHIP__URL || "http://localhost:11001",
});
