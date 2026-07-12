import type {
  ComboboxItem,
  ComboboxLikeRenderOptionInput,
} from "@mantine/core";

import { msg } from "@lingui/core/macro";
import { Button, Checkbox, Group, Select, Text } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { TbCheck } from "react-icons/tb";

import type { ReadyFormInput } from "./types";

import { dayjs } from "../../../../../../../../common/dates/vars/dayjs";
import { useForm } from "../../../../../../../../isomorphic/core/hooks/use-form";
import { useLocalization } from "../../../../../../../../isomorphic/localization/hooks/use-localization";
import { orpcClientSideQueryClient } from "../../../../../../../orpc/vars/clients";
import { Schemas } from "./schemas";

export function ReadyForm({
  initialValues,
  onError,
  onSubmit,
}: ReadyFormInput) {
  const { localization } = useLocalization();

  const [now] = useState(dayjs().locale(localization.locale).local());

  const streamCheckQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.stream.check.queryOptions({
      gcTime: 0,
      refetchInterval: 1000,
      staleTime: 1000,
    }),
  );

  const listClosestInstancesInput = useMemo(
    () => ({
      end: now.add(1, "hour").utc().format("YYYY-MM-DDTHH:mm:ss[Z]"),
      reference: now.utc().format("YYYY-MM-DDTHH:mm:ss[Z]"),
      start: now.subtract(1, "hour").utc().format("YYYY-MM-DDTHH:mm:ss[Z]"),
      where: { event: { is: { type: "live" as const } } },
    }),
    [now],
  );

  const listClosestInstancesQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.composites.listClosestInstances.queryOptions(
      {
        input: listClosestInstancesInput,
      },
    ),
  );

  const instances = listClosestInstancesQuery.data.instances;

  const mergedInitialValues = useMemo(
    () => ({
      show: instances[0]
        ? `${instances[0].event.id}/${instances[0].start}/${instances[0].duration}`
        : undefined,
      ...initialValues,
    }),
    [initialValues, instances],
  );

  const [ready, setReady] = useState(!!mergedInitialValues.show);

  const { form, handleFormSubmit, submitting } = useForm({
    initialValues: mergedInitialValues,
    onError: onError,
    onSubmit: onSubmit,
    onValuesChange: (values) => setReady(!!values.show),
    schema: Schemas.Values,
  });

  const renderShowOption = useCallback(
    ({ checked, option }: ComboboxLikeRenderOptionInput<ComboboxItem>) => {
      const instance = instances.find(
        (instance) =>
          option.value ===
          `${instance.event.id}/${instance.start}/${instance.duration}`,
      )!;

      return (
        <Group gap="xl" w="100%">
          <Group flex={1} gap="xs">
            {checked && <TbCheck size="1em" />}
            <Text inherit={true}>{instance.event.show.title}</Text>
          </Group>
          <Group gap="xs">
            <Text inherit={true}>
              {dayjs
                .tz(instance.start, instance.event.timezone)
                .locale(localization.locale)
                .local()
                .format("LT")}
            </Text>
            <Text inherit={true}>&ndash;</Text>
            <Text inherit={true}>
              {dayjs
                .tz(instance.start, instance.event.timezone)
                .add(dayjs.duration(instance.duration))
                .locale(localization.locale)
                .local()
                .format("LT")}
            </Text>
          </Group>
        </Group>
      );
    },
    [instances, localization.locale],
  );

  return (
    <form onSubmit={handleFormSubmit} style={{ display: "contents" }}>
      <Select
        data={instances.map((instance) => ({
          label: instance.event.show.title,
          value: `${instance.event.id}/${instance.start}/${instance.duration}`,
        }))}
        key={form.key("show")}
        label={localization.localize(msg({ message: "Show" }))}
        placeholder={localization.localize(msg({ message: "Select show" }))}
        renderOption={renderShowOption}
        required={true}
        {...form.getInputProps("show")}
      />
      <Checkbox
        key={form.key("record")}
        label={localization.localize(msg({ message: "Record" }))}
        {...form.getInputProps("record", { type: "checkbox" })}
      />
      <Button
        disabled={!ready || !!streamCheckQuery.data.instance}
        loaderProps={{ type: "dots" }}
        loading={submitting}
        mt="auto"
        style={{ flexShrink: 0 }}
        type="submit"
      >
        {localization.localize(msg({ message: "Ready" }))}
      </Button>
    </form>
  );
}
