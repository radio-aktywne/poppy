import { call } from "@orpc/server";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";
import { authenticatedMiddleware } from "../../../../../../../middleware/authenticated";
import { passthrough } from "../../../passthrough";
import { stream } from "../../../stream";

export const reserveStreamWithPassthrough =
  orpcServerRootBase.core.composites.reserveStreamWithPassthrough
    .use(authenticatedMiddleware)
    .handler(async ({ input }) => {
      const streamReserveData = await call(stream.reserve, {
        event: input.event,
        format: input.format,
        record: input.record,
      });

      const passthroughRequestData = await call(passthrough.request, {
        bitrate: input.bitrate,
        channels: input.channels,
        codec: input.codec,
        format: input.format,
        metadata: input.metadata,
        samplerate: input.samplerate,
        srt: {
          host: state.current.config.srt.octopus.host,
          latency: state.current.config.srt.octopus.latency,
          password: streamReserveData.credentials.token,
          port: state.current.config.srt.octopus.port,
        },
        webrtc: input.webrtc,
      });

      return { stun: passthroughRequestData.stun };
    });
