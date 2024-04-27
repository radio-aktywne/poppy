import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const scheme = process.env.EMIWEB__EMIPASS__HTTP__SCHEME || "http";
const host = process.env.EMIWEB__EMIPASS__HTTP__HOST || "localhost";
const port = process.env.EMIWEB__EMIPASS__HTTP__PORT || "11000";
const path = process.env.EMIWEB__EMIPASS__HTTP__PATH || "";
const url = `${scheme}://${host}:${port}${path}`;

export const emipass = createClient<paths>({ baseUrl: url });
