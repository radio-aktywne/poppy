import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const scheme = process.env.WEBSTREAM__EMIPASS__WHIP__SCHEME || "http";
const host = process.env.WEBSTREAM__EMIPASS__WHIP__HOST || "localhost";
const port =
  process.env.WEBSTREAM__EMIPASS__WHIP__PORT === undefined
    ? 11001
    : process.env.WEBSTREAM__EMIPASS__WHIP__PORT;
const path = (process.env.WEBSTREAM__EMIPASS__WHIP__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const whip = createClient<paths>({ baseUrl: url });
