import { msg } from "@lingui/core/macro";
import "client-only";
import { useCallback, useMemo, useState } from "react";

import {
  UseStreamInput,
  UseStreamOutput,
  UseStreamStartData,
  UseStreamState,
} from "./types";
import { startStream, stopStream } from "./utils";

export function useStream({}: UseStreamInput = {}): UseStreamOutput {
  const [state, setState] = useState<UseStreamState>({ live: false });
  const [loading, setLoading] = useState(false);

  const start = useCallback(
    async (data: UseStreamStartData) => {
      if (state.live) return msg({ message: "Stream is already running" });

      setLoading(true);

      try {
        const { error, media, peer, session } = await startStream(data);

        if (error) return error;

        setState({ live: true, media: media, peer: peer, session: session });
      } finally {
        setLoading(false);
      }
    },
    [state],
  );

  const stop = useCallback(async () => {
    if (!state.live) return msg({ message: "Stream is not running" });

    setLoading(true);

    try {
      await stopStream(state.media, state.peer, state.session);
      setState({ live: false });
    } finally {
      setLoading(false);
    }
  }, [state]);

  return useMemo(
    () => ({ live: state.live, loading: loading, start: start, stop: stop }),
    [state, loading, start, stop],
  );
}
