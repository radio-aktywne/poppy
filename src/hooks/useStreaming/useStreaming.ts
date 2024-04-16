import "client-only";

import { useCallback, useState } from "react";
import { FormValues } from "../../components/StreamingWidget/IdleWidget";
import { useStream } from "../useStream";
import { UseStreamingProps } from "./useStreaming.types";

export function useStreaming({ onError }: UseStreamingProps = {}) {
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);

  const onStreamError = useCallback(() => {
    setStreaming(false);
    onError?.();
  }, [onError]);

  const { start, stop } = useStream({ onError: onStreamError });

  const wrappedStart = useCallback(
    async (values: FormValues) => {
      if (streaming) return;

      setLoading(true);

      try {
        await start(values);
        setStreaming(true);
      } finally {
        setLoading(false);
      }
    },
    [streaming, start],
  );

  const wrappedStop = useCallback(async () => {
    if (!streaming) return;

    setLoading(true);

    try {
      await stop();
    } finally {
      setStreaming(false);
      setLoading(false);
    }
  }, [streaming, stop]);

  return { loading, streaming, start: wrappedStart, stop: wrappedStop };
}
