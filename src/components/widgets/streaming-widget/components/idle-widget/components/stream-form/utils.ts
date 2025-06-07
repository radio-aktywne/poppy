import dayjs from "../../../../../../../dayjs";
import { UseListSchedulesSuccessState } from "../../../../../../../hooks/beaver/use-list-schedules/types";
import { datetimeDataFormat, schedulesWindow } from "./constants";

export function getSchedulesWindow(now: dayjs.Dayjs) {
  const window = dayjs.duration(schedulesWindow);

  return {
    end: now.add(window),
    start: now.subtract(window),
  };
}

export function formatDatetime(dt: dayjs.Dayjs) {
  return dt.format(datetimeDataFormat);
}

export function isCloser(
  a: string,
  b: string,
  atz: string,
  btz: string,
  now: dayjs.Dayjs,
) {
  const adt = dayjs.tz(a, atz);
  const bdt = dayjs.tz(b, btz);

  const adiff = Math.abs(adt.diff(now));
  const bdiff = Math.abs(bdt.diff(now));

  return adiff < bdiff;
}

export function getClosestInstances(
  schedules: UseListSchedulesSuccessState["data"]["schedules"],
  now: dayjs.Dayjs,
) {
  return schedules.map((schedule) => ({
    event: schedule.event,
    instance: schedule.instances.reduce((previous, current) =>
      isCloser(
        previous.start,
        current.start,
        schedule.event.timezone,
        schedule.event.timezone,
        now,
      )
        ? previous
        : current,
    ),
  }));
}

export function getEventLabel(
  event: UseListSchedulesSuccessState["data"]["schedules"][number]["event"],
) {
  return event.show!.title;
}
