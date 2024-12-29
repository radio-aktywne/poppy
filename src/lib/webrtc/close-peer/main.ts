import "client-only";

import { ClosePeerInput } from "./types";

export function closePeer({ peer }: ClosePeerInput): void {
  peer.close();
}
