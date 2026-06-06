import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";
import { authenticatedMiddleware } from "../../../../../../../middleware/authenticated";

export const create = orpcServerRootBase.core.whip.create
  .use(authenticatedMiddleware)
  .handler(async ({ errors, input }) => {
    const { data: createSessionData, response: createSessionResponse } =
      await state.current.apis.whip.createSession({ body: input });

    if (createSessionData === undefined) {
      if (createSessionResponse.status === 409) throw errors.CONFLICT();
      throw errors.INTERNAL_SERVER_ERROR();
    }

    const answer = createSessionData;
    const session = createSessionResponse.headers
      .get("Location")!
      .split("/")
      .pop()!;

    return { answer: answer, session: session };
  });
