import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const host = process.env.EMIWEB__EMISTREAM__HTTP__HOST || "localhost";
const port = process.env.EMIWEB__EMISTREAM__HTTP__PORT || "10000";
const url = `http://${host}:${port}`;

export const emistream = createClient<paths>({ baseUrl: url });
