import "client-only";

import { PeerCreateProps } from "./types";

export class Peer {
  private connection: RTCPeerConnection;

  constructor(connection: RTCPeerConnection) {
    this.connection = connection;
  }

  public static async create({
    media,
    stun,
    config,
    candidatesGatheringTimeout = 1000,
    onError,
  }: PeerCreateProps) {
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

    media.tracks.forEach((track) =>
      peer.addTransceiver(track, { direction: "sendonly" }),
    );

    const candidatesGathered = new Promise<void>((resolve) => {
      peer.onicecandidate = ({ candidate }) => candidate === null && resolve();
      setTimeout(resolve, candidatesGatheringTimeout);
    });

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

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
