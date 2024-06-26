import "client-only";

import { merge } from "lodash";
import { SDPInfo } from "semantic-sdp";
import { Media } from "../media";
import { Codecs, PeerConfig, PeerCreateProps, STUNConfig } from "./types";

const DEFAULT_CODECS: Codecs = {
  opus: {
    ptime: "10",
    maxaveragebitrate: "510000",
  },
};

export class Peer {
  private connection: RTCPeerConnection;

  constructor(connection: RTCPeerConnection) {
    this.connection = connection;
  }

  private static createPeer(
    stun: STUNConfig,
    config: PeerConfig | undefined,
    onError: (() => void) | undefined,
  ) {
    const stunUrl = `stun:${stun.host}:${stun.port}`;
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: stunUrl }],
      iceCandidatePoolSize: 1,
      ...config,
    });

    peer.onconnectionstatechange = () => {
      if (peer.connectionState === "failed") {
        peer.close();
        onError?.();
      }
    };

    return peer;
  }

  private static addTracks(peer: RTCPeerConnection, media: Media) {
    media.tracks.forEach((track) =>
      peer.addTransceiver(track, { direction: "sendonly" }),
    );
  }

  private static async gatherCandidates(
    peer: RTCPeerConnection,
    timeout: number,
  ) {
    return await new Promise<void>((resolve) => {
      peer.onicecandidate = ({ candidate }) => candidate === null && resolve();
      setTimeout(resolve, timeout);
    });
  }

  private static async createOffer(peer: RTCPeerConnection, codecs: Codecs) {
    const offer = await peer.createOffer();

    if (offer.sdp !== undefined) {
      const sdp = SDPInfo.parse(offer.sdp);
      for (const media of sdp.getMedias()) {
        for (const codec of media.getCodecs().values()) {
          const properties = codecs[codec.getCodec()];
          if (properties !== undefined) codec.addParams(properties);
        }
      }

      offer.sdp = sdp.toString();
    }

    await peer.setLocalDescription(offer);
  }

  public static async create({
    media,
    stun,
    config,
    codecs,
    timeout = 1000,
    onError,
  }: PeerCreateProps) {
    const peer = Peer.createPeer(stun, config, onError);
    Peer.addTracks(peer, media);

    const candidatesGathered = Peer.gatherCandidates(peer, timeout);
    await Peer.createOffer(peer, merge({}, DEFAULT_CODECS, codecs));
    await candidatesGathered;

    return new Peer(peer);
  }

  public get offer() {
    return this.connection.localDescription!.sdp;
  }

  public async handleAnswer(answer: string) {
    await this.connection.setRemoteDescription({
      type: "answer",
      sdp: answer,
    });
  }

  public async close() {
    this.connection.close();
  }
}
