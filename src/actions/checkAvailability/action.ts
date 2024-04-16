"use server";

import { emistream } from "../../api";
import { CheckAvailabilityProps } from "./types";

const errorMessage = "Checking availability failed.";

export async function checkAvailability({}: CheckAvailabilityProps = {}) {
  try {
    const { data, error } = await emistream.GET("/check");

    if (error) return { data: undefined, error: errorMessage };
    return { data, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
