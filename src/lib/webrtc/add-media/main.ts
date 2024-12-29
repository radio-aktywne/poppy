import "client-only";

import { AddMediaInput } from "./types";

export function addMedia({ media, peer }: AddMediaInput): void {
  media
    .getTracks()
    .forEach((track) => peer.addTransceiver(track, { direction: "sendonly" }));
}
