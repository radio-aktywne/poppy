import "client-only";

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
  instance?: InstanceData;
  recording?: boolean;
  title?: string;
};

export type StreamLiveData = StreamStartingData & {
  session: string;
  timestamp: number;
};

export type StreamReadyingData = {
  instance: InstanceData;
  recording: boolean;
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
  now?: NowState;
  stream?: StreamState;
};

export type StateSubscribeCallback = (state: State) => void;

export type StateUnsubscribe = () => void;

export type StateSubscribe = (
  callback: StateSubscribeCallback,
) => StateUnsubscribe;
