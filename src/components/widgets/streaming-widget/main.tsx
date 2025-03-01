"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Loader } from "@mantine/core";
import { useCallback } from "react";

import { useStream } from "../../../hooks/use-stream";
import { useToasts } from "../../../hooks/use-toasts";
import { IdleWidget } from "./components/idle-widget";
import { IdleWidgetStartStreamData } from "./components/idle-widget/types";
import { LiveWidget } from "./components/live-widget";
import { StreamingWidgetInput } from "./types";

export function StreamingWidget({ target }: StreamingWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { live, loading, start, stop } = useStream();

  const handleStart = useCallback(
    async (data: IdleWidgetStartStreamData) => {
      const error = await start({
        event: data.event,
        record: data.record,
        target: target,
      });

      if (error) {
        toasts.error(_(error));
        return error;
      }

      toasts.success(_(msg({ message: "Stream started" })));
    },
    [_, start, target, toasts],
  );

  const handleStop = useCallback(async () => {
    const error = await stop();

    if (error) toasts.error(_(error));
    else toasts.success(_(msg({ message: "Stream stopped" })));
  }, [_, stop, toasts]);

  if (loading) return <Loader />;

  return live ? (
    <LiveWidget onStop={handleStop} />
  ) : (
    <IdleWidget onStart={handleStart} />
  );
}
