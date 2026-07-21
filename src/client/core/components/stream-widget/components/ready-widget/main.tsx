import { msg } from "@lingui/core/macro";
import { Button } from "@mantine/core";
import { useCallback } from "react";

import type { ReadyWidgetInput } from "./types";

import { LoadingWidget } from "../../../../../../common/core/components/generic/loading-widget";
import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../../../isomorphic/notifications/hooks/use-notifications";
import { useStream } from "../../../../hooks/use-stream";
import { ReadyPreview } from "./components/ready-preview";

export function ReadyWidget({}: ReadyWidgetInput) {
  const { localization } = useLocalization();
  const { notifications } = useNotifications();

  const { start, state, unready } = useStream();

  const handleStart = useCallback(async () => {
    const error = await start();

    if (error) notifications.error({ message: error });
    else notifications.success({ message: msg({ message: "Stream started" }) });
  }, [notifications.error, notifications.success, start]);

  const handleUnready = useCallback(async () => {
    const error = await unready();

    if (error) notifications.error({ message: error });
    else
      notifications.success({
        message: msg({ message: "Stream got unready" }),
      });
  }, [unready, notifications.error, notifications.success]);

  if (state.state !== "ready") return <LoadingWidget />;

  return (
    <>
      <ReadyPreview data={state.data} />
      <Button
        color="ra-red"
        mt="auto"
        onClick={handleStart}
        style={{ flexShrink: 0 }}
      >
        {localization.localize(msg({ context: "action", message: "Start" }))}
      </Button>
      <Button
        color="gray"
        onClick={handleUnready}
        style={{ flexShrink: 0 }}
        variant="light"
      >
        {localization.localize(msg({ message: "Unready" }))}
      </Button>
    </>
  );
}
