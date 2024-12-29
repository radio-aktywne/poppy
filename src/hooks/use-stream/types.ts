import { MessageDescriptor } from "@lingui/core";

import { ReserveStreamInput } from "../../actions/octopus/reserve-stream";
import { SRTAddress } from "../../lib/get-octopus-srt-address";

export type UseStreamIdleState = {
  live: false;
  media?: undefined;
  peer?: undefined;
};

export type UseStreamLiveState = {
  live: true;
  media: MediaStream;
  peer: RTCPeerConnection;
};

export type UseStreamState = UseStreamIdleState | UseStreamLiveState;

export type UseStreamStartData = {
  target: SRTAddress;
} & Omit<ReserveStreamInput, "format">;

export type UseStreamInput = {
  [key: string]: never;
};

export type UseStreamOutput = {
  live: boolean;
  loading: boolean;
  start: (
    data: UseStreamStartData,
  ) => Promise<MessageDescriptor | null | undefined>;
  stop: () => Promise<MessageDescriptor | null | undefined>;
};
