import { msg } from "@lingui/core/macro";
import { Button, Select } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useSuspenseQuery } from "@tanstack/react-query";
import { isString } from "es-toolkit/predicate";
import { useState } from "react";

import type { CreateEventFormInput } from "./types";

import { dayjs } from "../../../../../../../../../../common/dates/vars/dayjs";
import { useForm } from "../../../../../../../../../../isomorphic/core/hooks/use-form";
import { useLocalization } from "../../../../../../../../../../isomorphic/localization/hooks/use-localization";
import { orpcClientSideQueryClient } from "../../../../../../../../../orpc/vars/clients";
import { Schemas } from "./schemas";

export function CreateEventForm({
  initialValues: initialInitialValues,
  now,
  onError,
  onSubmit,
}: CreateEventFormInput) {
  const { localization } = useLocalization();

  const showsListQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.shows.list.queryOptions(),
  );

  const shows = showsListQuery.data.shows;

  const [start] = useState(
    now.add(5 - (now.minute() % 5), "minute").startOf("minute"),
  );
  const [initialValues] = useState({
    end: start.add(1, "hour").format("YYYY-MM-DDTHH:mm:ss"),
    show: initialInitialValues?.show,
    start: start.format("YYYY-MM-DDTHH:mm:ss"),
  });
  const [selectedStart, setSelectedStart] = useState<string | undefined>(
    initialValues.start,
  );

  const { form, handleFormSubmit, submitting } = useForm({
    initialValues: initialValues,
    inputSchema: Schemas.Input,
    onError: onError,
    onSubmit: onSubmit,
    onValuesChange: ({ current, previous }) => {
      setSelectedStart(current.start);

      if (
        current.start !== previous.start &&
        current.start &&
        current.end &&
        !dayjs(current.end).isAfter(current.start)
      ) {
        form.setFieldValue("end", null);
      }
    },
    outputSchema: Schemas.Output,
  });

  return (
    <form onSubmit={handleFormSubmit} style={{ display: "contents" }}>
      <Select
        clearable={true}
        data={shows.map((show) => ({ label: show.title, value: show.id }))}
        errorProps={{
          title: [form.getInputProps("show").error].find(isString),
        }}
        key={form.key("show")}
        label={localization.localize(msg({ message: "Show" }))}
        placeholder={localization.localize(msg({ message: "No show" }))}
        {...form.getInputProps("show")}
      />
      <DateTimePicker
        dropdownType="modal"
        errorProps={{
          title: [form.getInputProps("start").error].find(isString),
        }}
        key={form.key("start")}
        label={localization.localize(
          msg({ context: "time", message: "Start" }),
        )}
        maxDate={now.add(1, "hour").format("YYYY-MM-DDTHH:mm:ss")}
        minDate={now.subtract(1, "hour").format("YYYY-MM-DDTHH:mm:ss")}
        placeholder={localization.localize(
          msg({ message: "Select start date and time" }),
        )}
        required={true}
        valueFormat="LLL"
        {...form.getInputProps("start")}
      />
      <DateTimePicker
        dropdownType="modal"
        errorProps={{
          title: [form.getInputProps("end").error].find(isString),
        }}
        key={form.key("end")}
        label={localization.localize(msg({ context: "time", message: "End" }))}
        minDate={selectedStart}
        placeholder={localization.localize(
          msg({ message: "Select end date and time" }),
        )}
        required={true}
        valueFormat="LLL"
        {...form.getInputProps("end")}
      />
      <Button loading={submitting} style={{ flexShrink: 0 }} type="submit">
        {localization.localize(msg({ message: "Create" }))}
      </Button>
    </form>
  );
}
