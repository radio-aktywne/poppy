import { MessageDescriptor } from "@lingui/core";

import {
  CreateWHIPSessionInput as InternalCreateWHIPSessionInput,
  CreateWHIPSessionOutput as InternalCreateWHIPSessionOutput,
} from "../../../lib/whip/create-whip-session";

export type CreateWHIPSessionInput = {
  offer: InternalCreateWHIPSessionInput["offer"];
};

export type CreateWHIPSessionSuccessOutput = {
  data: InternalCreateWHIPSessionOutput;
  error?: never;
};

export type CreateWHIPSessionErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type CreateWHIPSessionOutput =
  | CreateWHIPSessionErrorOutput
  | CreateWHIPSessionSuccessOutput;
