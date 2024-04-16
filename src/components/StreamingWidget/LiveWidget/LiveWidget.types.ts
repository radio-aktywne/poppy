export type LiveWidgetLabels = {
  buttons: {
    stop: {
      label: string;
    };
  };
};

export type LiveWidgetProps = {
  onStop?: () => void;
  labels: LiveWidgetLabels;
};
