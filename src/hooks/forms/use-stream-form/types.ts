import { UseFormReturnType } from "@mantine/form";

import { UseListSchedulesSuccessState } from "../../beaver/use-list-schedules/types";

export type UseStreamFormAllowedValues = {
  event: string[];
};

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

export type UseStreamFormEventData = {
  event: UseListSchedulesSuccessState["data"]["schedules"][number]["event"];
  instance: UseListSchedulesSuccessState["data"]["schedules"][number]["instances"][number];
};

export type UseStreamFormEventsData = {
  [event: string]: UseStreamFormEventData;
};

export type UseStreamFormInput = {
  initialValues?: UseStreamFormInitialValues;
  validate?: UseStreamFormValidators;
};

export type UseStreamFormOutput = {
  allowedValues: UseStreamFormAllowedValues;
  defaultValues: UseStreamFormDefaultValues;
  eventsData: UseStreamFormEventsData;
  form: UseFormReturnType<UseStreamFormValues>;
  loading: boolean;
};
