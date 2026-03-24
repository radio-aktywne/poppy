import { msg } from "@lingui/core/macro";
import { Button } from "@mantine/core";
import { useCallback } from "react";

import type { LiveWidgetInput } from "./types";

import { LoadingWidget } from "../../../../../../common/core/components/generic/loading-widget";
import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../../../isomorphic/notifications/hooks/use-notifications";
import { useStream } from "../../../../hooks/use-stream";
import { LivePreview } from "./components/live-preview";

export function LiveWidget({}: LiveWidgetInput) {
  const { localization } = useLocalization();
  const { notifications } = useNotifications();

  const { state, stop } = useStream();

  const handleStop = useCallback(async () => {
    const error = await stop();

    if (error) notifications.error({ message: error });
    else notifications.success({ message: msg({ message: "Stream stopped" }) });
  }, [notifications.error, notifications.success, stop]);

  if (state.state !== "live") return <LoadingWidget />;

  return (
    <>
      <LivePreview data={state.data} />
      <Button
        color="ra-red"
        mt="auto"
        onClick={handleStop}
        style={{ flexShrink: 0 }}
      >
        {localization.localize(msg({ message: "Stop" }))}
      </Button>
    </>
  );
}
