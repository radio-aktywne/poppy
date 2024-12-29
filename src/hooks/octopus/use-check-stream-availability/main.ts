import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { checkStreamAvailability } from "../../../actions/octopus/check-stream-availability";
import {
  UseCheckStreamAvailabilityInput,
  UseCheckStreamAvailabilityOutput,
  UseCheckStreamAvailabilityState,
} from "./types";

export function useCheckStreamAvailability({
  interval = 1000 * 5,
}: UseCheckStreamAvailabilityInput = {}): UseCheckStreamAvailabilityOutput {
  const [state, setState] = useState<UseCheckStreamAvailabilityState>({
    loading: true,
  });

  const refresh = useCallback(async () => {
    const { checkedAt, error, event } = await checkStreamAvailability();
    if (error) setState({ error: error, loading: false });
    else setState({ checkedAt: checkedAt, event: event, loading: false });
  }, []);

  const { start, stop } = useInterval(refresh, interval);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return useMemo(() => ({ ...state, refresh }), [state, refresh]);
}
