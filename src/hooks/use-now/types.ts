import dayjs from "../../dayjs";

export type UseNowInput = {
  interval?: number;
};

export type UseNowOutput = {
  now: dayjs.Dayjs;
  refresh: () => void;
};
