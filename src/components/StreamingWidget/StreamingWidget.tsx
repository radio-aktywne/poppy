"use client";

import { Loader } from "@mantine/core";
import { useCallback } from "react";
import { useAvailability, useStreaming, useToasts } from "../../hooks";
import { FormValues, IdleWidget } from "./IdleWidget";
import { LiveWidget } from "./LiveWidget";
import { StreamingWidgetProps } from "./StreamingWidget.types";

export function StreamingWidget({ schedules, labels }: StreamingWidgetProps) {
  const { availability, fetchAvailability } = useAvailability();

  const { error } = useToasts();

  const onError = useCallback(async () => {
    error(labels.toasts.error.message);
    await fetchAvailability();
  }, [error, labels.toasts.error.message, fetchAvailability]);

  const { loading, streaming, start, stop } = useStreaming({ onError });

  const onStart = useCallback(
    async (values: FormValues) => {
      try {
        await start(values);
      } catch {
        error(labels.toasts.error.message);
      }

      await fetchAvailability();
    },
    [start, error, labels.toasts.error.message, fetchAvailability],
  );

  if (loading) return <Loader />;

  if (streaming)
    return <LiveWidget onStop={stop} labels={labels.widgets.live} />;

  return (
    <IdleWidget
      availability={availability}
      schedules={schedules}
      onStart={onStart}
      labels={labels.widgets.idle}
    />
  );
}
