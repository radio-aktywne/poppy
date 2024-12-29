import {
  UseStreamFormValidators,
  UseStreamFormValues,
} from "../../../../../../../hooks/forms/use-stream-form";

export type StreamFormData = UseStreamFormValues;

export type StreamFormErrors = {
  [K in keyof UseStreamFormValues]?: string;
};

export type StreamFormValidators = UseStreamFormValidators;

export type StreamFormInput = {
  disabled?: boolean;
  onStart?: (
    data: StreamFormData,
  ) => Promise<null | StreamFormErrors | undefined>;
  validate?: StreamFormValidators;
};
