import type {
  UseFormInitialValues,
  UseFormOnError,
  UseFormOnSubmit,
  UseFormSubmitInput,
  UseFormValues,
} from "../../../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type ReadyFormSchema = typeof Schemas.Values;

export type ReadyFormValues = UseFormValues<ReadyFormSchema>;

export type ReadyFormInitialValues = UseFormInitialValues<ReadyFormSchema>;

export type ReadyFormPartialInitialValues =
  | Partial<ReadyFormInitialValues>
  | undefined;

export type ReadyFormOnError = UseFormOnError;

export type ReadyFormSubmitInput = UseFormSubmitInput<ReadyFormSchema>;

export type ReadyFormOnSubmit = UseFormOnSubmit<ReadyFormSchema>;

export type ReadyFormInput = {
  initialValues?: ReadyFormPartialInitialValues;
  onError?: ReadyFormOnError;
  onSubmit: ReadyFormOnSubmit;
};
