import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import dayjs from "../../dayjs";
import { UseNowInput, UseNowOutput } from "./types";

export function useNow({
  interval = 1000 * 5,
}: UseNowInput = {}): UseNowOutput {
  const [now, setNow] = useState(() => dayjs.utc());

  const refresh = useCallback(() => {
    setNow(dayjs.utc());
  }, []);

  const { start, stop } = useInterval(refresh, interval);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return useMemo(() => ({ now, refresh }), [now, refresh]);
}
