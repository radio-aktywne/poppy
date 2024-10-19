"use server";

import { loris } from "../../api";
import { CreatePasthroughProps } from "./types";

const errorMessage = "Creating passthrough failed.";

const host = process.env.POPPY__OCTOPUS__SRT__HOST || "localhost";
const port =
  process.env.POPPY__OCTOPUS__SRT__PORT === undefined
    ? 10300
    : parseInt(process.env.POPPY__OCTOPUS__SRT__PORT, 10);

export async function createPassthrough({ password }: CreatePasthroughProps) {
  try {
    const { data, error } = await loris.POST("/stream", {
      body: {
        srt: {
          host: host,
          port: port,
          password: password,
        },
      },
    });

    if (error) return { data: undefined, error: errorMessage };
    return { data, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
