"use client";

import { useLingui } from "@lingui/react";
import { Stack } from "@mantine/core";
import { useEffect } from "react";

import { useCheckStreamAvailability } from "../../../hooks/octopus/use-check-stream-availability";
import { useToasts } from "../../../hooks/use-toasts";
import { BusyDisplay } from "./components/busy-display";
import { Clock } from "./components/clock";
import { FreeDisplay } from "./components/free-display";
import { Logo } from "./components/logo";
import { StatusWidgetInput } from "./types";

export function StatusWidget({
  availability: prefetchedAvailability,
}: StatusWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentAvailability, error } = useCheckStreamAvailability();
  const availability = currentAvailability ?? prefetchedAvailability;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  return (
    <Stack align="center" justify="center" w="100%">
      <Logo />
      <Clock />
      {availability.event == null ? (
        <FreeDisplay />
      ) : (
        <BusyDisplay event={availability.event} />
      )}
    </Stack>
  );
}
