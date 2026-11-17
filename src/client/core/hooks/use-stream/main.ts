import { msg } from "@lingui/core/macro";
import { useCallback, useMemo, useState } from "react";
import { ref } from "valtio";

import type {
  UseStreamInput,
  UseStreamOutput,
  UseStreamReadyInput,
  UseStreamStartInput,
} from "./types";

import { useGlobalState } from "../../../../isomorphic/state/hooks/use-global-state";
import * as utils from "./utils";

export function useStream({}: UseStreamInput = {}): UseStreamOutput {
  const { state } = useGlobalState();

  const [defaultStreamState] = useState({ data: {}, state: "idle" as const });
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
        force: input.force,
        instance: input.instance,
        recording: input.record,
        start: input.start,
        title: input.title,
      };
      state.current.stream = { data: currentData, state: "readying" };

      try {
        const newData = await utils.ready(currentData);

        state.current.stream = {
          data: {
            force: newData.force,
            instance: newData.instance,
            media: ref(newData.media),
            peer: ref(newData.peer),
            recording: newData.recording,
            start: newData.start,
            title: newData.title,
          },
          state: "ready",
        };
      } catch {
        state.current.stream = { data: currentData, state: "idle" };
        return msg({ message: "Failed to make stream ready" });
      }
    },
    [state.current],
  );

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
      const newData = {};
      state.current.stream = { data: newData, state: "idle" };
    }
  }, [state.current]);

  const start = useCallback(
    async ({ onFailure }: UseStreamStartInput = {}) => {
      if (state.current.stream?.state !== "ready")
        return msg({
          message: "Stream can't be started, because it is not currently ready",
        });

      const currentData = state.current.stream.data;
      state.current.stream = { data: currentData, state: "starting" };

      try {
        const newData = await utils.start(currentData, async () => {
          if (state.current.stream?.state !== "live") return;

          const error = await stop();
          onFailure?.(
            error
              ? msg({
                  message:
                    "Stream ended unexpectedly, and some resources failed to clean up",
                })
              : msg({
                  message: "Stream ended unexpectedly",
                }),
          );
        });

        state.current.stream = {
          data: {
            force: newData.force,
            instance: newData.instance,
            media: ref(newData.media),
            peer: ref(newData.peer),
            recording: newData.recording,
            session: newData.session,
            start: newData.start,
            timestamp: newData.timestamp,
            title: newData.title,
            unsubscribe: newData.unsubscribe,
          },
          state: "live",
        };
      } catch {
        try {
          await utils.unready(currentData);
        } catch {
          return msg({
            message:
              "Failed to start stream, and some resources failed to clean up",
          });
        } finally {
          const newData = {
            force: currentData.force,
            instance: currentData.instance,
            recording: currentData.recording,
            start: currentData.start,
            title: currentData.title,
          };
          state.current.stream = { data: newData, state: "idle" };
        }

        return msg({ message: "Failed to start stream" });
      }
    },
    [state.current, stop],
  );

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
      const newData = {
        force: currentData.force,
        instance: currentData.instance,
        recording: currentData.recording,
        start: currentData.start,
        title: currentData.title,
      };
      state.current.stream = { data: newData, state: "idle" };
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
