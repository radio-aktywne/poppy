import "server-only";

import { whip } from "../../../services/whip";
import { WHIPError } from "../errors";
import { SessionNotFoundError } from "./errors";
import { DeleteWHIPSessionInput } from "./types";

export async function deleteWHIPSession({}: DeleteWHIPSessionInput = {}): Promise<void> {
  const { error, response } = await whip.DELETE("/whip/resource/whip-client", {
    parseAs: "text",
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new SessionNotFoundError();
    throw new WHIPError();
  }
}
