"use server";

import { emipass } from "../../api";
import { CreatePasthroughProps } from "./types";

const errorMessage = "Creating passthrough failed.";

const host = process.env.WEBSTREAM__EMISTREAM__SRT__HOST || "localhost";
const port =
  process.env.WEBSTREAM__EMISTREAM__SRT__PORT === undefined
    ? 10000
    : parseInt(process.env.WEBSTREAM__EMISTREAM__SRT__PORT, 10);

export async function createPassthrough({ password }: CreatePasthroughProps) {
  try {
    const { data, error } = await emipass.POST("/stream", {
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
