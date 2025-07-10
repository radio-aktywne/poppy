"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Badge, Loader } from "@mantine/core";
import { useEffect } from "react";

import { useGetEvent } from "../../../../../hooks/beaver/use-get-event";
import { useToasts } from "../../../../../hooks/use-toasts";
import { BusyDisplayInput } from "./types";

export function BusyDisplay({ event: eventId }: BusyDisplayInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const {
    data: event,
    error,
    loading,
  } = useGetEvent({
    id: eventId,
    include: JSON.stringify({ show: "true" }),
  });

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  return (
    <>
      <Badge color="ra-red" fullWidth size="xl" variant="light">
        {loading ? (
          <Loader type="dots" />
        ) : (
          (event?.show?.title ?? _(msg({ message: "Unknown" })))
        )}
      </Badge>
    </>
  );
}
