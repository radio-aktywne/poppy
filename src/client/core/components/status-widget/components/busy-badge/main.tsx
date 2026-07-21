import { msg } from "@lingui/core/macro";
import { Badge, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import type { BusyBadgeInput } from "./types";

import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { orpcClientSideQueryClient } from "../../../../../orpc/vars/clients";

export function BusyBadge({ id }: BusyBadgeInput) {
  const { localization } = useLocalization();

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

  const event = eventsGetQuery.data;

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
        event.show ? (
          event.show.title
        ) : (
          localization.localize(msg({ message: "No show" }))
        )
      ) : (
        <Loader color="var(--mantine-color-ra-red-light)" type="dots" />
      )}
    </Badge>
  );
}
