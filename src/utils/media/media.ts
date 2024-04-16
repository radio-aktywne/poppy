import "client-only";

import { MediaCreateProps } from "./types";

export class Media {
  private media: MediaStream;

  constructor(media: MediaStream) {
    this.media = media;
  }

  public static async create({ constraints }: MediaCreateProps = {}) {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: constraints ?? true,
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
