import "client-only";

import { useForm } from "@mantine/form";
import dayjs from "../../utils/dayjs";
import { useHydrated } from "../useHydrated";
import { UseStreamFormProps } from "./useStreamForm.types";

export function useStreamForm({ schedules }: UseStreamFormProps) {
  const hydrated = useHydrated();

  const now = dayjs.utc();
  const userTimezone = dayjs.tz.guess();

  const closestEventSchedules = schedules.map((schedule) => ({
    event: schedule.event,
    instance: schedule.instances.reduce((previous, current) => {
      const previousStart = dayjs.tz(
        previous.start as string,
        schedule.event.timezone,
      );
      const currentStart = dayjs.tz(
        current.start as string,
        schedule.event.timezone,
      );

      const previousDelta = Math.abs(previousStart.diff(now));
      const currentDelta = Math.abs(currentStart.diff(now));

      return previousDelta < currentDelta ? previous : current;
    }),
  }));

  const closestEventSchedule = closestEventSchedules.reduce(
    (previous, current) => {
      const previousStart = dayjs.tz(
        previous.instance.start as string,
        previous.event.timezone,
      );
      const currentStart = dayjs.tz(
        current.instance.start as string,
        current.event.timezone,
      );

      const previousDelta = Math.abs(previousStart.diff(now));
      const currentDelta = Math.abs(currentStart.diff(now));

      return previousDelta < currentDelta ? previous : current;
    },
  );

  const form = useForm({
    initialValues: {
      event: closestEventSchedule.event.id,
      record: false,
    },
  });

  const eventSelectData = closestEventSchedules.map((schedule) => {
    const value = schedule.event.id;
    const title = schedule.event.show!.title;
    const start = dayjs
      .tz(schedule.instance.start as string, schedule.event.timezone)
      .tz(userTimezone)
      .format("HH:mm");
    const end = dayjs
      .tz(schedule.instance.end as string, schedule.event.timezone)
      .tz(userTimezone)
      .format("HH:mm");
    const label = hydrated ? `${title} [${start} - ${end}]` : title;

    return { value, label };
  });

  return { form, eventSelectData };
}
