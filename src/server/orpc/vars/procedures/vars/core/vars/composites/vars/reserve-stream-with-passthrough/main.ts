import { call } from "@orpc/server";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";
import { passthrough } from "../../../passthrough";
import { stream } from "../../../stream";

export const reserveStreamWithPassthrough =
  orpcServerRootBase.core.composites.reserveStreamWithPassthrough.handler(
    async ({ input }) => {
      const streamReserveData = await call(stream.reserve, {
        event: input.event,
        format: input.format,
        record: input.record,
      });

      const passthroughRequestData = await call(passthrough.request, {
        codec: input.codec,
        format: input.format,
        srt: {
          host: state.current.config.srt.octopus.host,
          password: streamReserveData.credentials.token,
          port: state.current.config.srt.octopus.port,
        },
        stun: input.stun,
      });

      return { stun: passthroughRequestData.stun };
    },
  );
