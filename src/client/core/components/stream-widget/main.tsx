"use client";

import { msg } from "@lingui/core/macro";
import { Stack, Title } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";

import type { StreamWidgetInput } from "./types";

import { LoadingWidget } from "../../../../common/core/components/generic/loading-widget";
import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useStream } from "../../hooks/use-stream";
import { IdleWidget } from "./components/idle-widget";
import { LiveWidget } from "./components/live-widget";
import { ReadyWidget } from "./components/ready-widget";

export function StreamWidget({}: StreamWidgetInput) {
  const { localization } = useLocalization();
  const queryClient = useQueryClient();

  const { state } = useStream();

  useEffect(() => {
    void queryClient.invalidateQueries();
  }, [state.state, queryClient]);

  return (
    <Stack h="100%" w="100%">
      <Title ta="center">
        {localization.localize(msg({ message: "Stream" }))}
      </Title>
      <Suspense fallback={<LoadingWidget />}>
        {(() => {
          switch (state.state) {
            case "idle":
              return <IdleWidget />;
            case "live":
              return <LiveWidget />;
            case "ready":
              return <ReadyWidget />;
            default:
              return <LoadingWidget />;
          }
        })()}
      </Suspense>
    </Stack>
  );
}
