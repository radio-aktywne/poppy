"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Stack, Title } from "@mantine/core";

import { useElapsed } from "../../../../../hooks/use-elapsed";
import { LiveWidgetInput } from "./types";

export function LiveWidget({ onStop }: LiveWidgetInput) {
  const { _ } = useLingui();

  const { elapsed } = useElapsed();

  return (
    <Stack>
      <Title>{elapsed.format("HH:mm:ss")}</Title>
      <Button color="ra-red" onClick={onStop}>
        {_(msg({ message: "Stop" }))}
      </Button>
    </Stack>
  );
}
