import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const host = process.env.EMIWEB__EMIPASS__WHIP__HOST || "localhost";
const port = process.env.EMIWEB__EMIPASS__WHIP__PORT || "11001";
const url = `http://${host}:${port}`;

export const whip = createClient<paths>({ baseUrl: url });
