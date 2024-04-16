import { Media } from "../media";

export type STUNConfig = {
  host: string;
  port: number;
};

export type PeerCreateProps = {
  media: Media;
  stun: STUNConfig;
  config?: Omit<RTCConfiguration, "iceServers">;
  candidatesGatheringTimeout?: number;
  onError?: () => void;
};
