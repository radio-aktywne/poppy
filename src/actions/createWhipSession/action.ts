"use server";

import { whip } from "../../api";
import { CreateWhipSessionProps } from "./types";

const errorMessage = "Creating WHIP session failed.";

export async function createWhipSession({ offer }: CreateWhipSessionProps) {
  try {
    const { data, error } = await whip.POST("/whip/endpoint", {
      body: offer,
      headers: { "Content-Type": "application/sdp" },
      parseAs: "text",
      bodySerializer: (body) => body,
    });

    if (error) return { data: undefined, error: errorMessage };
    return { data: data as string, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
