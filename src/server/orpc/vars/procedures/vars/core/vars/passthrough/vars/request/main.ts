import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";
import { authenticatedMiddleware } from "../../../../../../../middleware/authenticated";

export const request = orpcServerRootBase.core.passthrough.request
  .use(authenticatedMiddleware)
  .handler(async ({ errors, input }) => {
    const { data: streamStreamData, response: streamStreamResponse } =
      await state.current.apis.loris.streamStream({ body: input });

    if (streamStreamData === undefined) {
      if (streamStreamResponse.status === 409) throw errors.CONFLICT();
      throw errors.INTERNAL_SERVER_ERROR();
    }

    return streamStreamData;
  });
