import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const scheme = process.env.WEBSTREAM__EMISTREAM__HTTP__SCHEME || "http";
const host = process.env.WEBSTREAM__EMISTREAM__HTTP__HOST || "localhost";
const port =
  process.env.WEBSTREAM__EMISTREAM__HTTP__PORT === undefined
    ? 10000
    : process.env.WEBSTREAM__EMISTREAM__HTTP__PORT;
const path = (process.env.WEBSTREAM__EMISTREAM__HTTP__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const emistream = createClient<paths>({ baseUrl: url });
