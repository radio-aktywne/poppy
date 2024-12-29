import "client-only";

import { CloseMediaInput } from "./types";

export function closeMedia({ media }: CloseMediaInput): void {
  media.getTracks().forEach((track) => {
    track.stop();
  });
}
