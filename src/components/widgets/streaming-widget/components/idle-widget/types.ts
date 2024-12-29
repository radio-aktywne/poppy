import { MessageDescriptor } from "@lingui/core";

import { ReserveStreamInput } from "../../../../../actions/octopus/reserve-stream";

export type IdleWidgetStartStreamData = Omit<ReserveStreamInput, "format">;

export type IdleWidgetInput = {
  onStart?: (
    data: IdleWidgetStartStreamData,
  ) => Promise<MessageDescriptor | null | undefined>;
};
