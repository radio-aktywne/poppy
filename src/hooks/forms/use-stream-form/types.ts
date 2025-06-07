import { UseFormReturnType } from "@mantine/form";

export type UseStreamFormValues = {
  event: string | undefined;
  record: boolean;
};

export type UseStreamFormInitialValues = Partial<UseStreamFormValues>;

export type UseStreamFormValidators = {
  [K in keyof UseStreamFormValues]?: (
    value: UseStreamFormValues[K],
  ) => null | string | undefined;
};

export type UseStreamFormDefaultValues = Partial<UseStreamFormValues>;

export type UseStreamFormInput = {
  initialValues?: UseStreamFormInitialValues;
  validate?: UseStreamFormValidators;
};

export type UseStreamFormOutput = {
  defaultValues: UseStreamFormDefaultValues;
  form: UseFormReturnType<UseStreamFormValues>;
};
