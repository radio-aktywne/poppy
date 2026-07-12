"use client";

import { msg } from "@lingui/core/macro";
import { Stack, Title } from "@mantine/core";
import { Center, Logo } from "@radio-aktywne/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import NextImage from "next/image";

import type { StatusWidgetInput } from "./types";

import { dayjs } from "../../../../common/dates/vars/dayjs";
import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useNow } from "../../../generic/hooks/use-now";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import { BusyBadge } from "./components/busy-badge";
import { FreeBadge } from "./components/free-badge";

export function StatusWidget({}: StatusWidgetInput) {
  const { localization } = useLocalization();
  const { timestamp } = useNow();

  const streamCheckQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.stream.check.queryOptions({
      gcTime: 0,
      refetchInterval: 1000,
      staleTime: 1000,
    }),
  );

  return (
    <Stack align="center" h="100%" w="100%">
      <Title ta="center">
        {localization.localize(msg({ message: "Status" }))}
      </Title>
      <Center>
        <Stack align="center" gap="xl">
          <Logo
            alt={localization.localize(msg({ message: "Logo" }))}
            component={NextImage}
            h="auto"
            unoptimized={true}
          />
          <Title c="dimmed">
            {dayjs
              .unix(timestamp)
              .locale(localization.locale)
              .local()
              .format("LTS")}
          </Title>
        </Stack>
      </Center>
      {streamCheckQuery.data.instance ? (
        <BusyBadge id={streamCheckQuery.data.instance.event} />
      ) : (
        <FreeBadge />
      )}
    </Stack>
  );
}
