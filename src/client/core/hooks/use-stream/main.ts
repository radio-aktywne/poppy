import { msg } from "@lingui/core/macro";
import { useCallback, useMemo, useState } from "react";
import { ref } from "valtio";

import type {
  UseStreamInput,
  UseStreamOutput,
  UseStreamReadyInput,
} from "./types";

import { useGlobalState } from "../../../../isomorphic/state/hooks/use-global-state";
import * as utils from "./utils";

export function useStream({}: UseStreamInput = {}): UseStreamOutput {
  const { state } = useGlobalState();

  const [defaultStreamState] = useState(() => ({ state: "idle" as const }));
  const streamState = state.snapshot.stream ?? defaultStreamState;

  const ready = useCallback(
    async (input: UseStreamReadyInput) => {
      if (
        state.current.stream !== undefined &&
        state.current.stream.state !== "idle"
      )
        return msg({
          message:
            "Stream can't be made ready, because it is not currently idle",
        });

      const currentData = {
        event: input.event,
        instance: input.instance,
        recording: input.record,
      };
      state.current.stream = { data: currentData, state: "readying" };

      try {
        const newData = await utils.ready(currentData);

        state.current.stream = {
          data: {
            event: newData.event,
            instance: newData.instance,
            media: ref(newData.media),
            peer: ref(newData.peer),
            recording: newData.recording,
          },
          state: "ready",
        };
      } catch {
        state.current.stream = { state: "idle" };
        return msg({ message: "Failed to make stream ready" });
      }
    },
    [state.current],
  );

  const start = useCallback(async () => {
    if (state.current.stream?.state !== "ready")
      return msg({
        message: "Stream can't be started, because it is not currently ready",
      });

    const currentData = state.current.stream.data;
    state.current.stream = { data: currentData, state: "starting" };

    try {
      const newData = await utils.start(currentData);

      state.current.stream = {
        data: {
          event: newData.event,
          instance: newData.instance,
          media: ref(newData.media),
          peer: ref(newData.peer),
          recording: newData.recording,
          session: newData.session,
          timestamp: newData.timestamp,
        },
        state: "live",
      };
    } catch {
      state.current.stream = { data: currentData, state: "ready" };
      return msg({ message: "Failed to start stream" });
    }
  }, [state.current]);

  const stop = useCallback(async () => {
    if (state.current.stream?.state !== "live")
      return msg({
        message: "Stream can't be stopped, because it is not currently live",
      });

    const currentData = state.current.stream.data;
    state.current.stream = { data: currentData, state: "stopping" };

    try {
      await utils.stop(currentData);
    } catch {
      return msg({
        message: "Stream stopped, but some resources failed to clean up",
      });
    } finally {
      state.current.stream = { state: "idle" };
    }
  }, [state.current]);

  const unready = useCallback(async () => {
    if (state.current.stream?.state !== "ready")
      return msg({
        message:
          "Stream can't be made unready, because it is not currently ready",
      });

    const currentData = state.current.stream.data;
    state.current.stream = { data: currentData, state: "unreadying" };

    try {
      await utils.unready(currentData);
    } catch {
      return msg({
        message: "Stream got unready, but some resources failed to clean up",
      });
    } finally {
      state.current.stream = { state: "idle" };
    }
  }, [state.current]);

  return useMemo(
    () => ({
      ready: ready,
      start: start,
      state: streamState,
      stop: stop,
      unready: unready,
    }),
    [ready, start, stop, streamState, unready],
  );
}
