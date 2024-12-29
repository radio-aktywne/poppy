import "client-only";

import { HandleAnswerInput } from "./types";

export function handleAnswer({ answer, peer }: HandleAnswerInput): void {
  peer.setRemoteDescription({ sdp: answer, type: "answer" });
}
