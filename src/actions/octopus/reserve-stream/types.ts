import { MessageDescriptor } from "@lingui/core";

import {
  ReserveStreamInput as InternalReserveStreamInput,
  ReserveStreamOutput as InternalReserveStreamOutput,
} from "../../../lib/octopus/reserve-stream";

export type ReserveStreamInput = {
  event: InternalReserveStreamInput["event"];
  format: InternalReserveStreamInput["format"];
  record: InternalReserveStreamInput["record"];
};

export type ReserveStreamSuccessOutput = {
  data: InternalReserveStreamOutput;
  error?: never;
};

export type ReserveStreamErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type ReserveStreamOutput =
  | ReserveStreamErrorOutput
  | ReserveStreamSuccessOutput;
