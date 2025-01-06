"use server";

import { auth } from "../../../auth";
import { deleteWHIPSession as internalDeleteWHIPSession } from "../../../lib/whip/delete-whip-session";
import { SessionNotFoundError } from "../../../lib/whip/delete-whip-session/errors";
import { WHIPError } from "../../../lib/whip/errors";
import { errors } from "./constants";
import { DeleteWHIPSessionInput, DeleteWHIPSessionOutput } from "./types";

export async function deleteWHIPSession({}: DeleteWHIPSessionInput = {}): Promise<DeleteWHIPSessionOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  try {
    await internalDeleteWHIPSession();
    return {};
  } catch (error) {
    if (error instanceof SessionNotFoundError)
      return { error: errors.notFound };
    if (error instanceof WHIPError) return { error: errors.generic };
    throw error;
  }
}
