import { components } from "../../api/emishows";
import { IdleWidgetLabels } from "./IdleWidget";
import { LiveWidgetLabels } from "./LiveWidget";

export type Labels = {
  widgets: {
    idle: IdleWidgetLabels;
    live: LiveWidgetLabels;
  };
  toasts: {
    error: {
      message: string;
    };
  };
};

export type StreamingWidgetProps = {
  schedules: components["schemas"]["Schedule"][];
  labels: Labels;
};
