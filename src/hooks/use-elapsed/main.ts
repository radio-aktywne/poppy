import "client-only";
import { useMemo, useState } from "react";

import dayjs from "../../dayjs";
import { useNow } from "../use-now";
import { UseElapsedInput, UseElapsedOutput } from "./types";

export function useElapsed({
  interval = 1000 * 1,
}: UseElapsedInput = {}): UseElapsedOutput {
  const { now, refresh } = useNow({ interval: interval });
  const [start] = useState(now);

  const elapsed = useMemo(() => dayjs.duration(now.diff(start)), [now, start]);

  return useMemo(() => ({ elapsed: elapsed, refresh }), [elapsed, refresh]);
}
