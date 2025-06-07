"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Checkbox, Loader, Select, Stack } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";

import { useListSchedules } from "../../../../../../../hooks/beaver/use-list-schedules";
import {
  useStreamForm,
  UseStreamFormValues,
} from "../../../../../../../hooks/forms/use-stream-form";
import { useNow } from "../../../../../../../hooks/use-now";
import { schedulesFilter, schedulesInclude } from "./constants";
import { StreamFormInput } from "./types";
import {
  formatDatetime,
  getClosestInstances,
  getEventLabel,
  getSchedulesWindow,
} from "./utils";

export function StreamForm({ disabled, onStart, validate }: StreamFormInput) {
  const [starting, setStarting] = useState(false);

  const { _ } = useLingui();

  const { now } = useNow();
  const { end, start } = useMemo(() => getSchedulesWindow(now), [now]);
  const { data: schedules, loading: schedulesLoading } = useListSchedules({
    end: formatDatetime(end),
    include: JSON.stringify(schedulesInclude),
    start: formatDatetime(start),
    where: JSON.stringify(schedulesFilter),
  });

  const { form } = useStreamForm({ validate: validate });

  const formSetErrors = form.setErrors;

  const handleStart = useCallback(
    async (data: UseStreamFormValues) => {
      setStarting(true);
      try {
        const errors = await onStart?.(data);
        if (errors) formSetErrors(errors);
      } finally {
        setStarting(false);
      }
    },
    [formSetErrors, onStart],
  );

  if (schedulesLoading) return <Loader />;

  const eventSelectData = getClosestInstances(
    schedules?.schedules ?? [],
    now,
  ).map(({ event }) => ({
    label: getEventLabel(event),
    value: event.id,
  }));

  return (
    <form onSubmit={form.onSubmit(handleStart)}>
      <Stack>
        <Select
          data={eventSelectData}
          label={_(msg({ message: "Event" }))}
          required={true}
          {...form.getInputProps("event")}
        />
        <Checkbox
          label={_(msg({ message: "Record" }))}
          {...form.getInputProps("record", { type: "checkbox" })}
        />
        <Button
          color="green"
          disabled={disabled}
          loading={starting}
          type="submit"
        >
          {_(msg({ message: "Start" }))}
        </Button>
      </Stack>
    </form>
  );
}
