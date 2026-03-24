import type { SetNonNullableDeep } from "type-fest";

import { msg } from "@lingui/core/macro";
import { Group, Stack, Text } from "@mantine/core";
import { Center } from "@radio-aktywne/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  MdFiberManualRecord,
  MdOutlineFiberManualRecord,
} from "react-icons/md";

import type { ReadyPreviewInput } from "./types";

import { dayjs } from "../../../../../../../../common/dates/vars/dayjs";
import { useLocalization } from "../../../../../../../../isomorphic/localization/hooks/use-localization";
import { orpcClientSideQueryClient } from "../../../../../../../orpc/vars/clients";

export function ReadyPreview({ data }: ReadyPreviewInput) {
  const { localization } = useLocalization();

  const eventsGetInput = useMemo(
    () => ({ id: data.event, include: { show: true } }),
    [data.event],
  );

  const eventsGetQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.events.get.queryOptions({
      input: eventsGetInput,
    }),
  );

  const event = eventsGetQuery.data as SetNonNullableDeep<
    typeof eventsGetQuery.data,
    "show"
  >;

  return (
    <Center>
      <Stack align="center" gap="xl">
        <Stack align="center" gap="xs">
          <Text fw="bold" fz="xl" inherit={true}>
            {event.show.title}
          </Text>
          <Group c="dimmed" fz="sm" gap="xs">
            <Text inherit={true}>
              {dayjs
                .tz(data.instance.start, event.timezone)
                .locale(localization.locale)
                .local()
                .format("LT")}
            </Text>
            <Text inherit={true}>&ndash;</Text>
            <Text inherit={true}>
              {dayjs
                .tz(data.instance.end, event.timezone)
                .locale(localization.locale)
                .local()
                .format("LT")}
            </Text>
          </Group>
        </Stack>
        <Group
          c={data.recording ? "var(--mantine-color-ra-red-filled)" : "dimmed"}
          fz="sm"
          gap="xs"
        >
          {data.recording ? (
            <MdFiberManualRecord size="1em" />
          ) : (
            <MdOutlineFiberManualRecord size="1em" />
          )}
          <Text inherit={true}>
            {data.recording
              ? localization.localize(msg({ message: "Recording" }))
              : localization.localize(msg({ message: "Not recording" }))}
          </Text>
        </Group>
      </Stack>
    </Center>
  );
}
