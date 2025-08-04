import "server-only";

import { whip } from "../../../services/whip";
import { WHIPError } from "../errors";
import { InvalidInputError } from "./errors";
import { CreateWHIPSessionInput, CreateWHIPSessionOutput } from "./types";

export async function createWHIPSession({
  offer,
}: CreateWHIPSessionInput): Promise<CreateWHIPSessionOutput> {
  const { data, error, response } = await whip.POST("/whip/endpoint", {
    body: offer,
    bodySerializer: (body) => body,
    headers: { "Content-Type": "application/sdp" },
    parseAs: "text",
  });

  if (error || !response.ok) {
    if (response.status === 400) throw new InvalidInputError();
    throw new WHIPError();
  }

  const answer = data!;
  const session = response.headers.get("Location")!.split("/").pop()!;

  return { answer: answer, session: session };
}
