"use server";

import { GetEventsWindowProps } from "./types";

export async function getEventsWindow({}: GetEventsWindowProps = {}) {
  return process.env.POPPY__EVENTS__WINDOW || "PT1H";
}
