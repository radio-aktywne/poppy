import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";
import { authenticatedMiddleware } from "../../../../../../../middleware/authenticated";

export const reserve = orpcServerRootBase.core.stream.reserve
  .use(authenticatedMiddleware)
  .handler(async ({ errors, input }) => {
    const { data: reserveReserveData, response: reserveReserveResponse } =
      await state.current.apis.octopus.reserveReserve({ body: input });

    if (reserveReserveData === undefined) {
      if (reserveReserveResponse.status === 409) throw errors.CONFLICT();
      throw errors.INTERNAL_SERVER_ERROR();
    }

    return reserveReserveData;
  });
