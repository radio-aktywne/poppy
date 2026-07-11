import { msg } from "@lingui/core/macro";
import { useCallback, useMemo } from "react";

import type { ReadyFormSubmitInput } from "./components/ready-form";
import type { IdleWidgetInput } from "./types";

import { LoadingWidget } from "../../../../../../common/core/components/generic/loading-widget";
import { useNotifications } from "../../../../../../isomorphic/notifications/hooks/use-notifications";
import { useStream } from "../../../../hooks/use-stream";
import { ReadyForm } from "./components/ready-form";

export function IdleWidget({}: IdleWidgetInput) {
  const { notifications } = useNotifications();

  const { ready, state } = useStream();

  const initialValues = useMemo(() => ({ record: false }), []);

  const handleReady = useCallback(
    async ({ values }: ReadyFormSubmitInput) => {
      const { record, show } = values;

      if (!show) {
        notifications.error({ message: msg({ message: "Invalid input" }) });
        return { errors: { show: msg({ message: "Show is required" }) } };
      }

      const [event, start, duration] = show.split("/") as [
        string,
        string,
        string,
      ];

      const error = await ready({
        event: event,
        instance: { duration: duration, start: start },
        record: record,
      });

      if (error) {
        notifications.error({ message: error });
        return;
      }

      notifications.success({ message: msg({ message: "Stream is ready" }) });
      return { values: values };
    },
    [notifications.error, notifications.success, ready],
  );

  const handleError = useCallback(() => {
    notifications.error({ message: msg({ message: "Invalid input" }) });
  }, [notifications.error]);

  if (state.state !== "idle") return <LoadingWidget />;

  return (
    <ReadyForm
      initialValues={initialValues}
      onError={handleError}
      onSubmit={handleReady}
    />
  );
}
