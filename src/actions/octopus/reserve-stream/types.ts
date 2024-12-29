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
  credentials: InternalReserveStreamOutput["credentials"];
  error?: never;
  port: InternalReserveStreamOutput["port"];
};

export type ReserveStreamErrorOutput = {
  credentials?: never;
  error: MessageDescriptor;
  port?: never;
};

export type ReserveStreamOutput =
  | ReserveStreamErrorOutput
  | ReserveStreamSuccessOutput;
