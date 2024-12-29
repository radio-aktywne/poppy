import { useForm } from "@mantine/form";
import "client-only";
import { useEffect, useMemo } from "react";

import { useListSchedules } from "../../beaver/use-list-schedules";
import { useNow } from "../../use-now";
import {
  defaultValues,
  schedulesFilter,
  schedulesInclude,
  schedulesLimit,
} from "./constants";
import {
  UseStreamFormInput,
  UseStreamFormOutput,
  UseStreamFormValues,
} from "./types";
import {
  formatDatetime,
  getClosestInstance,
  getClosestInstances,
  getSchedulesWindow,
} from "./utils";

export function useStreamForm({
  initialValues,
  validate,
}: UseStreamFormInput = {}): UseStreamFormOutput {
  const { now } = useNow();
  const { end, start } = useMemo(() => getSchedulesWindow(now), [now]);

  const { data: schedules, loading: schedulesLoading } = useListSchedules({
    end: formatDatetime(end),
    include: JSON.stringify(schedulesInclude),
    limit: schedulesLimit,
    start: formatDatetime(start),
    where: JSON.stringify(schedulesFilter),
  });

  const eventsData = useMemo(
    () =>
      Object.fromEntries(
        getClosestInstances(schedules?.schedules ?? [], now).map((data) => [
          data.event.id,
          data,
        ]),
      ),
    [schedules, now],
  );

  const form = useForm<UseStreamFormValues>({
    initialValues: {
      event:
        initialValues?.event === undefined
          ? defaultValues.event
          : initialValues.event,
      record:
        initialValues?.record === undefined
          ? defaultValues.record
          : initialValues.record,
    },
    validate: validate,
  });

  const allowedValues = useMemo(
    () => ({ event: Object.keys(eventsData) }),
    [eventsData],
  );

  const formSetInitialValues = form.setInitialValues;
  const formIsDirty = form.isDirty;
  const formReset = form.reset;

  useEffect(() => {
    const closestInstance = getClosestInstance(eventsData, now);
    const values = {
      event:
        initialValues?.event === undefined
          ? closestInstance?.event.id ?? defaultValues.event
          : initialValues.event,
      record:
        initialValues?.record === undefined
          ? defaultValues.record
          : initialValues.record,
    };

    if (formIsDirty()) formSetInitialValues(values);
    else {
      formSetInitialValues(values);
      formReset();
    }

    formSetInitialValues(values);
  }, [
    eventsData,
    formIsDirty,
    formReset,
    formSetInitialValues,
    initialValues,
    now,
  ]);

  return {
    allowedValues,
    defaultValues,
    eventsData,
    form,
    loading: schedulesLoading,
  };
}
