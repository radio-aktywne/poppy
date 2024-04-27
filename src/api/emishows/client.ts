import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const scheme = process.env.EMIWEB__EMISHOWS__HTTP__SCHEME || "http";
const host = process.env.EMIWEB__EMISHOWS__HTTP__HOST || "localhost";
const port = process.env.EMIWEB__EMISHOWS__HTTP__PORT || "35000";
const path = process.env.EMIWEB__EMISHOWS__HTTP__PATH || "";
const url = `${scheme}://${host}:${port}${path}`;

export const emishows = createClient<paths>({ baseUrl: url });
