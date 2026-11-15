import type { MessageDescriptor } from "@lingui/core";

import type { StreamState } from "../../../../isomorphic/state/types";

export type UseStreamInstanceData = {
  duration: string;
  event: string;
  start: string;
};

export type UseStreamReadyInput = {
  force: boolean;
  instance: UseStreamInstanceData;
  record: boolean;
  start: "hard" | "soft";
  title: string;
};

export type UseStreamStartInput = {
  onFailure?: (error: MessageDescriptor) => void;
};

export type UseStreamReady = (
  input: UseStreamReadyInput,
) => Promise<MessageDescriptor | void>;

export type UseStreamStart = (
  input?: UseStreamStartInput,
) => Promise<MessageDescriptor | void>;

export type UseStreamState = StreamState;

export type UseStreamStop = () => Promise<MessageDescriptor | void>;

export type UseStreamUnready = () => Promise<MessageDescriptor | void>;

export type UseStreamInput = object;

export type UseStreamOutput = {
  ready: UseStreamReady;
  start: UseStreamStart;
  state: UseStreamState;
  stop: UseStreamStop;
  unready: UseStreamUnready;
};
