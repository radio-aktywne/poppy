import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const scheme = process.env.EMIWEB__EMIPASS__WHIP__SCHEME || "http";
const host = process.env.EMIWEB__EMIPASS__WHIP__HOST || "localhost";
const port = process.env.EMIWEB__EMIPASS__WHIP__PORT || "11001";
const path = process.env.EMIWEB__EMIPASS__WHIP__PATH || "";
const url = `${scheme}://${host}:${port}${path}`;

export const whip = createClient<paths>({ baseUrl: url });
