"use server";

import { emishows } from "../../api";
import dayjs from "../../utils/dayjs";
import { getEventsWindow } from "../getEventsWindow";
import { GetSchedulesProps } from "./types";

const errorMessage = "Getting schedules failed.";

async function getWindow() {
  const now = dayjs.utc();

  const window = dayjs.duration(await getEventsWindow());

  const start = now.subtract(window);
  const end = now.add(window);

  return { start, end };
}

export async function getSchedules({}: GetSchedulesProps = {}) {
  try {
    const { start, end } = await getWindow();

    const format = "YYYY-MM-DDTHH:mm:ss";

    const { data, error } = await emishows.GET("/schedule", {
      params: {
        query: {
          start: start.format(format),
          end: end.format(format),
          where: JSON.stringify({ type: "live" }),
          include: JSON.stringify({ show: true }),
        },
      },
    });

    if (error) return { data: undefined, error: errorMessage };
    return { data: data?.schedules, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}
