"use client";

import { Badge, Button, Checkbox, Divider, Select, Stack } from "@mantine/core";
import { useStreamForm } from "../../../hooks";
import { IdleWidgetProps } from "./IdleWidget.types";

export function IdleWidget({
  availability,
  schedules,
  onStart,
  labels,
}: IdleWidgetProps) {
  const available = availability && availability.event == null;
  const { form, eventSelectData } = useStreamForm({ schedules });

  return (
    <Stack>
      <form onSubmit={form.onSubmit((values) => onStart?.(values))}>
        <Stack>
          <Select
            label={labels.form.selects.event.label}
            data={eventSelectData}
            {...form.getInputProps("event")}
          />
          <Checkbox
            label={labels.form.checkboxes.record.label}
            {...form.getInputProps("record", { type: "checkbox" })}
          />
          <Button type="submit" color="green" disabled={!available}>
            {labels.form.buttons.start.label}
          </Button>
        </Stack>
      </form>
      <Divider />
      <Badge
        color={available === undefined ? "gray" : available ? "green" : "red"}
        variant="light"
        fullWidth
      >
        {available === undefined
          ? labels.badges.availability.unknown
          : available
          ? labels.badges.availability.free
          : labels.badges.availability.busy}
      </Badge>
    </Stack>
  );
}
