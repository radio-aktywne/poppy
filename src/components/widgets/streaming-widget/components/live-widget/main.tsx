"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Button } from "@mantine/core";

import { LiveWidgetInput } from "./types";

export function LiveWidget({ onStop }: LiveWidgetInput) {
  const { _ } = useLingui();

  return (
    <Button color="red" onClick={onStop}>
      {_(msg({ message: "Stop" }))}
    </Button>
  );
}
