import { Title } from "@mantine/core";
import { NoEventsWidgetProps } from "./NoEventsWidget.types";

export function NoEventsWidget({ labels }: NoEventsWidgetProps) {
  return <Title>{labels.text}</Title>;
}
