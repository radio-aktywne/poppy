import { Media } from "../media";

export type STUNConfig = {
  host: string;
  port: number;
};

export type PeerConfig = Omit<RTCConfiguration, "iceServers">;

export type CodecProperties = {
  [key: string]: string;
};

export type Codecs = {
  [key: string]: CodecProperties;
};

export type PeerCreateProps = {
  media: Media;
  stun: STUNConfig;
  config?: PeerConfig;
  codecs?: Codecs;
  timeout?: number;
  onError?: () => void;
};
