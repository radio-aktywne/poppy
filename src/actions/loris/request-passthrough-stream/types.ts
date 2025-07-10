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
  data: InternalRequestPassthroughStreamOutput;
  error?: never;
};

export type RequestPassthroughStreamErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type RequestPassthroughStreamOutput =
  | RequestPassthroughStreamErrorOutput
  | RequestPassthroughStreamSuccessOutput;
