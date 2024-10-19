import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const scheme = process.env.POPPY__BEAVER__HTTP__SCHEME || "http";
const host = process.env.POPPY__BEAVER__HTTP__HOST || "localhost";
const port =
  process.env.POPPY__BEAVER__HTTP__PORT === undefined
    ? 35000
    : process.env.POPPY__BEAVER__HTTP__PORT;
const path = (process.env.POPPY__BEAVER__HTTP__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const beaver = createClient<paths>({ baseUrl: url });
