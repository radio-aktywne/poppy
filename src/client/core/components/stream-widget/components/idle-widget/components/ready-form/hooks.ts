import type { SetNonNullableDeep, SetRequiredDeep } from "type-fest";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import dayjs, { type Dayjs } from "dayjs";
import { sortBy, uniqBy } from "es-toolkit/array";
import { useMemo, useState } from "react";

import type { InstancesModelsShow } from "../../../../../../../../common/apis/beaver/types";
import type { ReadyFormInitialValues } from "./types";

import { useLocalization } from "../../../../../../../../isomorphic/localization/hooks/use-localization";
import { orpcClientSideQueryClient } from "../../../../../../../orpc/vars/clients";

export function useAvailable() {
  const streamCheckQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.stream.check.queryOptions({
      gcTime: 0,
      refetchInterval: 1000,
      staleTime: 1000,
    }),
  );

  return streamCheckQuery.data.instance === null;
}

export function useInstances() {
  const { localization } = useLocalization();
  const [now] = useState(dayjs().locale(localization.locale).local());

  const instancesListInput = {
    end: now.add(1, "hour").utc().format("YYYY-MM-DDTHH:mm:ss[Z]"),
    include: { event: { include: { show: true } } },
    start: now.subtract(1, "hour").utc().format("YYYY-MM-DDTHH:mm:ss[Z]"),
    where: { event: { is: { type: "live" as const } } },
  };

  const instancesListQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.instances.list.queryOptions({
      input: instancesListInput,
    }),
  );

  const unsorted = instancesListQuery.data.instances as SetRequiredDeep<
    SetNonNullableDeep<typeof instancesListQuery.data.instances, "0.event">,
    "0.event.show"
  >;

  const sorted = useMemo(
    () =>
      sortBy(unsorted, [
        (instance) =>
          Math.abs(
            dayjs
              .tz(instance.start, instance.event.timezone)
              .locale(localization.locale)
              .local()
              .diff(now),
          ),
      ]),
    [localization.locale, now, unsorted],
  );

  return sorted;
}

export function useShows(instances: ReturnType<typeof useInstances>) {
  return useMemo(
    () =>
      uniqBy(
        instances
          .map((instance) => instance.event.show as InstancesModelsShow | null)
          .filter((show) => show !== null),
        (show) => show.id,
      ),
    [instances],
  );
}

export function useInitialValues(
  initialValues: ReadyFormInitialValues | undefined,
  instances: ReturnType<typeof useInstances>,
) {
  const [event, start, duration] = initialValues?.instance
    ? initialValues.instance.split("/")
    : [null, null, null];

  const found = instances.find(
    (instance) =>
      instance.event.id === event &&
      instance.start === start &&
      instance.duration === duration,
  );
  const selected = found ?? instances[0];

  return useMemo(
    () => ({
      instance: selected
        ? `${selected.event.id}/${selected.start}/${selected.duration}`
        : null,
      record: initialValues?.record ?? false,
      title:
        found && initialValues?.title
          ? initialValues.title
          : ((selected?.event.show as InstancesModelsShow | null | undefined)
              ?.title ?? ""),
    }),
    [selected],
  );
}

export function useEarliestLatest(instances: ReturnType<typeof useInstances>) {
  const { localization } = useLocalization();

  return useMemo(
    () =>
      instances.reduce(
        (acc, instance) => {
          const start = dayjs
            .tz(instance.start, instance.event.timezone)
            .locale(localization.locale)
            .local();

          if (!acc[0] || !acc[1])
            return [start, start] satisfies [Dayjs, Dayjs];

          if (start.isBefore(acc[0])) acc[0] = start;
          if (start.isAfter(acc[1])) acc[1] = start;

          return acc;
        },
        [null, null] as [Dayjs, Dayjs] | [null, null],
      ),
    [localization.locale, instances],
  );
}

export function useSelectedShow(
  initialValues: ReadyFormInitialValues,
  instances: ReturnType<typeof useInstances>,
) {
  const [event, start, duration] = initialValues.instance
    ? initialValues.instance.split("/")
    : [null, null, null];

  const selected = instances.find(
    (instance) =>
      instance.event.id === event &&
      instance.start === start &&
      instance.duration === duration,
  );

  return useState(
    selected?.event.show
      ? (selected.event.show as InstancesModelsShow).id
      : null,
  );
}

export function useFilteredInstances(
  instances: ReturnType<typeof useInstances>,
  show: ReturnType<typeof useSelectedShow>[0],
) {
  return useMemo(
    () =>
      instances.filter(
        (instance) =>
          (instance.event.show
            ? (instance.event.show as InstancesModelsShow).id
            : null) === show,
      ),
    [instances, show],
  );
}

export function useEventsCreateMutation() {
  return useMutation(
    orpcClientSideQueryClient.core.events.create.mutationOptions({
      meta: {
        awaits: [orpcClientSideQueryClient.core.instances.list.key()],
      },
    }),
  );
}
