import "client-only";

import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { checkAvailability } from "../../actions";
import { Availability, UseAvailabilityProps } from "./useAvailability.types";

export function useAvailability({
  interval = 1000 * 5,
}: UseAvailabilityProps = {}) {
  const [availability, setAvailability] = useState<Availability>();

  const fetchAvailability = useCallback(async () => {
    try {
      const response = await checkAvailability();
      if (response.error !== undefined) throw new Error(response.error);
      setAvailability(response.data);
    } catch (error) {
      setAvailability(undefined);
    }
  }, []);

  const { start, stop } = useInterval(fetchAvailability, interval);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return { availability, fetchAvailability };
}
