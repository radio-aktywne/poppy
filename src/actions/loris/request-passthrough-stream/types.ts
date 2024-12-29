import { MessageDescriptor } from "@lingui/core";

import {
  RequestPassthroughStreamInput as InternalRequestPassthroughStreamInput,
  RequestPassthroughStreamOutput as InternalRequestPassthroughStreamOutput,
} from "../../../lib/loris/request-passthrough-stream";

export type RequestPassthroughStreamInput = {
  codec: InternalRequestPassthroughStreamInput["codec"];
  format: InternalRequestPassthroughStreamInput["format"];
  srt: InternalRequestPassthroughStreamInput["srt"];
  stun?: InternalRequestPassthroughStreamInput["stun"];
};

export type RequestPassthroughStreamSuccessOutput = {
  error?: never;
  port: InternalRequestPassthroughStreamOutput["port"];
  stun: InternalRequestPassthroughStreamOutput["stun"];
};

export type RequestPassthroughStreamErrorOutput = {
  error: MessageDescriptor;
  port?: never;
  stun?: never;
};

export type RequestPassthroughStreamOutput =
  | RequestPassthroughStreamErrorOutput
  | RequestPassthroughStreamSuccessOutput;
