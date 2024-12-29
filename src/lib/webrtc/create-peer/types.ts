export type CreatePeerInput = {
  config?: RTCConfiguration;
};

export type CreatePeerOutput = {
  peer: RTCPeerConnection;
};
