"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Badge, Center, Divider, Loader, Stack } from "@mantine/core";
import { useCallback } from "react";

import { useCheckStreamAvailability } from "../../../../../hooks/octopus/use-check-stream-availability";
import { StreamForm, StreamFormData } from "./components/stream-form";
import { IdleWidgetInput, IdleWidgetStartStreamData } from "./types";

export function IdleWidget({ onStart }: IdleWidgetInput) {
  const { _ } = useLingui();

  const { error, event, loading } = useCheckStreamAvailability();

  const available = error ? undefined : event == null;

  const handleStartAfterValidation = useCallback(
    async (data: IdleWidgetStartStreamData) => {
      const error = await onStart?.(data);
      if (error) {
        const translated = _(error);
        return { event: translated, record: translated };
      }
    },
    [_, onStart],
  );

  const handleStart = useCallback(
    async (data: StreamFormData) => {
      if (!data.event)
        return { event: _(msg({ message: "Event is required" })) };

      return handleStartAfterValidation({
        event: data.event,
        record: data.record,
      });
    },
    [_, handleStartAfterValidation],
  );

  if (loading) return <Loader />;

  return (
    <Stack>
      <Center>
        <StreamForm disabled={!available} onStart={handleStart} />
      </Center>
      <Divider />
      <Badge
        color={available === undefined ? "gray" : available ? "green" : "red"}
        fullWidth
        variant="light"
      >
        {available === undefined
          ? _(msg({ message: "Unknown" }))
          : available
          ? _(msg({ message: "Free" }))
          : _(msg({ message: "Busy" }))}
      </Badge>
    </Stack>
  );
}
