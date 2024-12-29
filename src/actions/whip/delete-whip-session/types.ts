import { MessageDescriptor } from "@lingui/core";

export type DeleteWHIPSessionInput = {
  [key: string]: never;
};

export type DeleteWHIPSessionSuccessOutput = {
  error?: never;
};

export type DeleteWHIPSessionErrorOutput = {
  error: MessageDescriptor;
};

export type DeleteWHIPSessionOutput =
  | DeleteWHIPSessionErrorOutput
  | DeleteWHIPSessionSuccessOutput;
