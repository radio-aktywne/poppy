import createClient, { ClientOptions } from "openapi-fetch";
import "server-only";

import type { paths } from "./types";

const scheme = process.env.POPPY__OCTOPUS__HTTP__SCHEME || "http";
const host = process.env.POPPY__OCTOPUS__HTTP__HOST || "localhost";
const port =
  process.env.POPPY__OCTOPUS__HTTP__PORT === undefined
    ? 10300
    : process.env.POPPY__OCTOPUS__HTTP__PORT;
const path = (process.env.POPPY__OCTOPUS__HTTP__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const octopusConfig = {
  baseUrl: url,
} satisfies ClientOptions;

export const octopus = createClient<paths>(octopusConfig);
