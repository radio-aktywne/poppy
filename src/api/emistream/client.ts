import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

export const emistream = createClient<paths>({
  baseUrl: process.env.EMIWEB__EMISTREAM__HTTP__URL || "http://localhost:10000",
});
