import type { SetNonNullableDeep } from "type-fest";

import { Badge, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import type { BusyBadgeInput } from "./types";

import { orpcClientSideQueryClient } from "../../../../../orpc/vars/clients";

export function BusyBadge({ id }: BusyBadgeInput) {
  const eventsGetInput = useMemo(
    () => ({ id: id, include: { show: true } }),
    [id],
  );

  const eventsGetQuery = useQuery(
    orpcClientSideQueryClient.core.events.get.queryOptions({
      gcTime: 0,
      input: eventsGetInput,
    }),
  );

  const event = eventsGetQuery.data as SetNonNullableDeep<
    typeof eventsGetQuery.data,
    "show"
  >;

  return (
    <Badge
      color="ra-red"
      display="grid"
      fullWidth
      mt="auto"
      radius={0}
      size="xl"
      style={{ flexShrink: 0 }}
      variant="light"
    >
      {event ? (
        event.show.title
      ) : (
        <Loader color="var(--mantine-color-ra-red-light)" type="dots" />
      )}
    </Badge>
  );
}
