import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";
import { authenticatedMiddleware } from "../../../../../../../middleware/authenticated";

export const check = orpcServerRootBase.core.stream.check
  .use(authenticatedMiddleware)
  .handler(async ({ errors }) => {
    const { data: checkCheckData } =
      await state.current.apis.octopus.checkCheck();

    if (checkCheckData === undefined) throw errors.INTERNAL_SERVER_ERROR();

    return checkCheckData;
  });
