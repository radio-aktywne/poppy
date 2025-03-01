import createClient, { ClientOptions } from "openapi-fetch";
import "server-only";

import type { paths } from "./types";

const scheme = process.env.POPPY__LORIS__WHIP__SCHEME || "http";
const host = process.env.POPPY__LORIS__WHIP__HOST || "localhost";
const port = process.env.POPPY__LORIS__WHIP__PORT ?? 10401;
const path = (process.env.POPPY__LORIS__WHIP__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const whipConfig = {
  baseUrl: url,
} satisfies ClientOptions;

export const whip = createClient<paths>(whipConfig);
