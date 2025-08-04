import { MessageDescriptor } from "@lingui/core";

import { DeleteWHIPSessionInput as InternalDeleteWHIPSessionInput } from "../../../lib/whip/delete-whip-session";

export type DeleteWHIPSessionInput = {
  session: InternalDeleteWHIPSessionInput["session"];
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
