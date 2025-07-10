import { Duration } from "dayjs/plugin/duration";

export type UseElapsedInput = {
  interval?: number;
};

export type UseElapsedOutput = {
  elapsed: Duration;
  refresh: () => void;
};
