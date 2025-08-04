import "server-only";

import { whip } from "../../../services/whip";
import { WHIPError } from "../errors";
import { DeleteWHIPSessionInput } from "./types";

export async function deleteWHIPSession({
  session,
}: DeleteWHIPSessionInput): Promise<void> {
  const { error, response } = await whip.DELETE("/whip/resource/{session}", {
    params: {
      path: {
        session: session,
      },
    },
    parseAs: "text",
  });

  if (error || !response.ok) throw new WHIPError();
}
