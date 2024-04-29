import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const scheme = process.env.EMIWEB__EMISHOWS__HTTP__SCHEME || "http";
const host = process.env.EMIWEB__EMISHOWS__HTTP__HOST || "localhost";
const port =
  process.env.EMIWEB__EMISHOWS__HTTP__PORT === undefined
    ? 35000
    : process.env.EMIWEB__EMISHOWS__HTTP__PORT;
const path = (process.env.EMIWEB__EMISHOWS__HTTP__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const emishows = createClient<paths>({ baseUrl: url });
