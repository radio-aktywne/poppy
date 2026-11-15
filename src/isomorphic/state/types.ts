import "client-only";

import type { ReadonlyDeep } from "type-fest";

export type HistoryEntry = {
  path: string;
  query?: { [key: string]: string | string[] };
};

export type HistoryState = {
  entries: HistoryEntry[];
};

export type NowState = {
  counter: number;
  timer: number;
  timestamp: number;
};

export type InstanceData = {
  duration: string;
  event: string;
  start: string;
};

export type StreamIdleData = {
  force?: boolean;
  instance?: InstanceData;
  recording?: boolean;
  start?: "hard" | "soft";
  title?: string;
};

export type StreamLiveData = StreamStartingData & {
  session: string;
  timestamp: number;
  unsubscribe: () => void;
};

export type StreamReadyingData = {
  force: boolean;
  instance: InstanceData;
  recording: boolean;
  start: "hard" | "soft";
  title: string;
};

export type StreamReadyData = StreamReadyingData & {
  media: MediaStream;
  peer: RTCPeerConnection;
};

export type StreamStartingData = StreamReadyData;

export type StreamStoppingData = StreamLiveData;

export type StreamUnreadyingData = StreamReadyData;

export type StreamIdleState = {
  data: StreamIdleData;
  state: "idle";
};

export type StreamLiveState = {
  data: StreamLiveData;
  state: "live";
};

export type StreamReadyingState = {
  data: StreamReadyingData;
  state: "readying";
};

export type StreamReadyState = {
  data: StreamReadyData;
  state: "ready";
};

export type StreamStartingState = {
  data: StreamStartingData;
  state: "starting";
};

export type StreamStoppingState = {
  data: StreamStoppingData;
  state: "stopping";
};

export type StreamUnreadyingState = {
  data: StreamUnreadyingData;
  state: "unreadying";
};

export type StreamState =
  | StreamIdleState
  | StreamLiveState
  | StreamReadyingState
  | StreamReadyState
  | StreamStartingState
  | StreamStoppingState
  | StreamUnreadyingState;

export type State = {
  history: HistoryState;
  now?: NowState;
  stream?: StreamState;
};

export type ReadonlyState = ReadonlyDeep<State>;

export type StateSubscribeCallback = (state: State) => void;

export type StateUnsubscribe = () => void;

export type StateSubscribe = (
  callback: StateSubscribeCallback,
) => StateUnsubscribe;
