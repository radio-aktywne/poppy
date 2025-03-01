"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Checkbox, Loader, Select, Stack } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useStreamForm,
  UseStreamFormValues,
} from "../../../../../../../hooks/forms/use-stream-form";
import { StreamFormInput } from "./types";
import { getEventLabel } from "./utils";

export function StreamForm({ disabled, onStart, validate }: StreamFormInput) {
  const [starting, setStarting] = useState(false);

  const { _ } = useLingui();

  const { allowedValues, eventsData, form, loading } = useStreamForm({
    validate: validate,
  });

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

  if (loading) return <Loader />;

  const eventSelectData = allowedValues.event.map((value) => ({
    label: _(getEventLabel(value, eventsData[value]!)),
    value: value,
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
