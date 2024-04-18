import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const host = process.env.EMIWEB__EMISHOWS__HOST || "localhost";
const port = process.env.EMIWEB__EMISHOWS__PORT || "35000";
const url = `http://${host}:${port}`;

export const emishows = createClient<paths>({ baseUrl: url });
