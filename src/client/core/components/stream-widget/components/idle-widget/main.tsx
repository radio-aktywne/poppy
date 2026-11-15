import { msg } from "@lingui/core/macro";
import { useCallback } from "react";

import type { ReadyFormSubmitInput } from "./components/ready-form";
import type { IdleWidgetInput } from "./types";

import { LoadingWidget } from "../../../../../../common/core/components/generic/loading-widget";
import { useNotifications } from "../../../../../../isomorphic/notifications/hooks/use-notifications";
import { useStream } from "../../../../hooks/use-stream";
import { ReadyForm } from "./components/ready-form";

export function IdleWidget({}: IdleWidgetInput) {
  const { notifications } = useNotifications();

  const { ready, state } = useStream();

  const handleReady = useCallback(
    async ({ values }: ReadyFormSubmitInput) => {
      const { force, instance, record, start, title } = values;

      if (!instance) {
        notifications.error({ message: msg({ message: "Invalid input" }) });
        return {
          errors: { instance: msg({ message: "Instance is required" }) },
        };
      }

      if (!title) {
        notifications.error({ message: msg({ message: "Invalid input" }) });
        return {
          errors: { title: msg({ message: "Title is required" }) },
        };
      }

      const [instanceEvent, instanceStart, instanceDuration] = instance.split(
        "/",
      ) as [string, string, string];

      const error = await ready({
        force: force,
        instance: {
          duration: instanceDuration,
          event: instanceEvent,
          start: instanceStart,
        },
        record: record,
        start: start,
        title: title,
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
      initialValues={{
        force: state.data.force,
        instance: state.data.instance
          ? `${state.data.instance.event}/${state.data.instance.start}/${state.data.instance.duration}`
          : undefined,
        record: state.data.recording,
        start: state.data.start,
        title: state.data.title,
      }}
      onError={handleError}
      onSubmit={handleReady}
    />
  );
}
