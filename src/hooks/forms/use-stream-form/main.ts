import { useForm } from "@mantine/form";
import "client-only";

import { defaultValues } from "./constants";
import {
  UseStreamFormInput,
  UseStreamFormOutput,
  UseStreamFormValues,
} from "./types";

export function useStreamForm({
  initialValues,
  validate,
}: UseStreamFormInput = {}): UseStreamFormOutput {
  const form = useForm<UseStreamFormValues>({
    initialValues: {
      event: initialValues?.event ?? defaultValues.event,
      record: initialValues?.record ?? defaultValues.record,
    },
    validate: validate,
  });

  return { defaultValues, form };
}
