"use server";

import { whip } from "../../api";
import { DeleteWhipSessionProps } from "./types";

const errorMessage = "Deleting WHIP session failed.";

export async function deleteWhipSession({}: DeleteWhipSessionProps = {}) {
  try {
    const { error } = await whip.DELETE("/whip/resource/whip-client", {
      parseAs: "text",
    });

    return { error: error ? errorMessage : undefined };
  } catch (error) {
    return { error: errorMessage };
  }
}
