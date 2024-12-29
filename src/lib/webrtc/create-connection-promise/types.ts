export type CreateConnectionPromiseInput = {
  peer: RTCPeerConnection;
};

export type CreateConnectionPromiseOutput = {
  promise: Promise<boolean>;
};
