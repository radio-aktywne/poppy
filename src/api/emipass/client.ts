import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const host = process.env.EMIWEB__EMIPASS__HTTP__HOST || "localhost";
const port = process.env.EMIWEB__EMIPASS__HTTP__PORT || "11000";
const url = `http://${host}:${port}`;

export const emipass = createClient<paths>({ baseUrl: url });
