"use server";

import { GetEventsWindowProps } from "./types";

export async function getEventsWindow({}: GetEventsWindowProps = {}) {
  return process.env.WEBSTREAM__EVENTS__WINDOW || "PT1H";
}
