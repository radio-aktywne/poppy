import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const delete_ = orpcServerRootBase.core.whip.delete.handler(
  async ({ errors, input }) => {
    const { data: deleteSessionData, response: deleteSessionResponse } =
      await state.current.apis.whip.deleteSession({ path: input });

    if (deleteSessionData === undefined) {
      if (deleteSessionResponse.status === 409) throw errors.CONFLICT();
      throw errors.INTERNAL_SERVER_ERROR();
    }
  },
);
