import "client-only";

import { merge } from "lodash";
import { MediaCreateProps } from "./types";

const DEFAULT_CONSTRAINTS: MediaTrackConstraints = {
  autoGainControl: false,
  channelCount: 2,
  echoCancellation: false,
  noiseSuppression: false,
  sampleRate: 48000,
  sampleSize: 16,
};

export class Media {
  private media: MediaStream;

  constructor(media: MediaStream) {
    this.media = media;
  }

  public static async create({ constraints }: MediaCreateProps = {}) {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: merge({}, DEFAULT_CONSTRAINTS, constraints),
    });

    return new Media(media);
  }

  public get tracks() {
    return this.media.getAudioTracks();
  }

  public async close() {
    this.media.getAudioTracks().forEach((track) => track.stop());
  }
}
