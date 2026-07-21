import { msg } from "@lingui/core/macro";
import { Button } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useState } from "react";

import type { CreateEventFormInput } from "./types";

import { dayjs } from "../../../../../../../../../../common/dates/vars/dayjs";
import { useForm } from "../../../../../../../../../../isomorphic/core/hooks/use-form";
import { useLocalization } from "../../../../../../../../../../isomorphic/localization/hooks/use-localization";
import { Schemas } from "./schemas";

export function CreateEventForm({ onError, onSubmit }: CreateEventFormInput) {
  const { localization } = useLocalization();

  const [now] = useState(dayjs().locale(localization.locale).local());
  const [start] = useState(
    now.add(5 - (now.minute() % 5), "minute").startOf("minute"),
  );
  const [initialValues] = useState({
    end: start.add(1, "hour").format("YYYY-MM-DD HH:mm:ss"),
    start: start.format("YYYY-MM-DD HH:mm:ss"),
  });

  const { form, handleFormSubmit, submitting } = useForm({
    initialValues: initialValues,
    onError: onError,
    onSubmit: onSubmit,
    schema: Schemas.Values,
  });

  return (
    <form onSubmit={handleFormSubmit} style={{ display: "contents" }}>
      <DateTimePicker
        dropdownType="modal"
        key={form.key("start")}
        label={localization.localize(
          msg({ context: "time", message: "Start" }),
        )}
        placeholder={localization.localize(
          msg({ message: "Select start date and time" }),
        )}
        required={true}
        valueFormat="LLL"
        {...form.getInputProps("start")}
      />
      <DateTimePicker
        dropdownType="modal"
        key={form.key("end")}
        label={localization.localize(msg({ context: "time", message: "End" }))}
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
