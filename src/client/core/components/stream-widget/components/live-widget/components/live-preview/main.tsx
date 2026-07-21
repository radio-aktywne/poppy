import { msg } from "@lingui/core/macro";
import { Group, Stack, Text, Title } from "@mantine/core";
import { Center } from "@radio-aktywne/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  MdFiberManualRecord,
  MdOutlineFiberManualRecord,
} from "react-icons/md";

import type { LivePreviewInput } from "./types";

import { dayjs } from "../../../../../../../../common/dates/vars/dayjs";
import { useLocalization } from "../../../../../../../../isomorphic/localization/hooks/use-localization";
import { useNow } from "../../../../../../../generic/hooks/use-now";
import { orpcClientSideQueryClient } from "../../../../../../../orpc/vars/clients";

export function LivePreview({ data }: LivePreviewInput) {
  const { localization } = useLocalization();
  const { timestamp } = useNow();

  const eventsGetInput = useMemo(
    () => ({ id: data.instance.event, include: { show: true } }),
    [data.instance.event],
  );

  const eventsGetQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.events.get.queryOptions({
      input: eventsGetInput,
    }),
  );

  const event = eventsGetQuery.data;

  const start = dayjs
    .tz(data.instance.start, event.timezone)
    .locale(localization.locale)
    .local();

  const end = start.add(dayjs.duration(data.instance.duration));

  const format = start.isSame(end, "day")
    ? "LT"
    : start.isSame(end, "week")
      ? "dddd, LT"
      : "LLLL";

  const parsedNow = dayjs.unix(timestamp);
  const parsedStart = dayjs.unix(data.timestamp);
  const elapsed = dayjs.duration(parsedNow.diff(parsedStart));

  return (
    <Center>
      <Stack align="center" gap="xl">
        <Stack align="center" gap="xs">
          <Title ta="center">{data.title}</Title>
          <Group c="dimmed" fz="sm" gap="xs">
            <Text inherit={true}>{start.format(format)}</Text>
            <Text inherit={true}>&ndash;</Text>
            <Text inherit={true}>{end.format(format)}</Text>
          </Group>
        </Stack>
        <Title
          c="var(--mantine-color-ra-red-filled)"
          size="calc(var(--mantine-h1-font-size) * 2)"
          ta="center"
        >
          {elapsed.format("HH:mm:ss")}
        </Title>
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
