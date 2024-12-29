import { UseStreamFormEventData } from "../../../../../../../hooks/forms/use-stream-form";

export function getEventLabel(value: string, data: UseStreamFormEventData) {
  return data.event.show!.title;
}
