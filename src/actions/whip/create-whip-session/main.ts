"use server";

import { auth } from "../../../auth";
import { createWHIPSession as internalCreateWHIPSession } from "../../../lib/whip/create-whip-session";
import { InvalidInputError } from "../../../lib/whip/create-whip-session/errors";
import { WHIPError } from "../../../lib/whip/errors";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { CreateWHIPSessionInput, CreateWHIPSessionOutput } from "./types";

export async function createWHIPSession(
  input: CreateWHIPSessionInput,
): Promise<CreateWHIPSessionOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { answer } = await internalCreateWHIPSession({
      offer: parsed.data.offer,
    });
    return { answer: answer };
  } catch (error) {
    if (error instanceof InvalidInputError)
      return { error: errors.invalidInput };
    if (error instanceof WHIPError) return { error: errors.generic };
    throw error;
  }
}
