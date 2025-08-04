"use server";

import { getSession } from "../../../lib/auth/get-session";
import { deleteWHIPSession as internalDeleteWHIPSession } from "../../../lib/whip/delete-whip-session";
import { WHIPError } from "../../../lib/whip/errors";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { DeleteWHIPSessionInput, DeleteWHIPSessionOutput } from "./types";

export async function deleteWHIPSession(
  input: DeleteWHIPSessionInput,
): Promise<DeleteWHIPSessionOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    await internalDeleteWHIPSession({ session: parsed.data.session });
    return {};
  } catch (error) {
    if (error instanceof WHIPError) return { error: errors.generic };
    throw error;
  }
}
