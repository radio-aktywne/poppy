const labels = {
  description: "emission web ui",
  toasts: {
    titles: {
      error: "Error",
      warning: "Warning",
      success: "Success",
    },
  },
  index: {
    title: "emiweb",
    inputs: {
      title: {
        label: "Stream title",
      },
    },
    buttons: {
      start: "Start",
      stop: "Stop",
    },
    checkboxes: {
      record: "Record",
    },
  },
};

export type Labels = typeof labels;

export default labels;
