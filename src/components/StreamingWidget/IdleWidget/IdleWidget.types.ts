import { components } from "../../../api/emishows";
import { Availability } from "../../../hooks";

export type FormValues = {
  event: string;
  record: boolean;
};

export type IdleWidgetLabels = {
  form: {
    selects: {
      event: {
        label: string;
      };
    };
    checkboxes: {
      record: {
        label: string;
      };
    };
    buttons: {
      start: {
        label: string;
      };
    };
  };
  badges: {
    availability: {
      busy: string;
      free: string;
      unknown: string;
    };
  };
};

export type IdleWidgetProps = {
  availability?: Availability;
  schedules: components["schemas"]["Schedule"][];
  onStart?: (values: FormValues) => void;
  labels: IdleWidgetLabels;
};
