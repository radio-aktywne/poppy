import { Button, Stack } from "@mantine/core";
import { LiveWidgetProps } from "./LiveWidget.types";

export function LiveWidget({ onStop, labels }: LiveWidgetProps) {
  return (
    <Stack>
      <Button onClick={onStop} color="red">
        {labels.buttons.stop.label}
      </Button>
    </Stack>
  );
}
