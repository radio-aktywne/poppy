export const labels = {
  toasts: {
    titles: {
      error: "Error",
      warning: "Warning",
      success: "Success",
      info: "Info",
    },
  },
  pages: {
    index: {
      title: "webstream",
      description: "webstream",
      widgets: {
        streaming: {
          widgets: {
            idle: {
              form: {
                selects: {
                  event: {
                    label: "Event",
                  },
                },
                checkboxes: {
                  record: {
                    label: "Record",
                  },
                },
                buttons: {
                  start: {
                    label: "Start",
                  },
                },
              },
              badges: {
                availability: {
                  busy: "Busy",
                  free: "Free",
                  unknown: "Unknown",
                },
              },
            },
            live: {
              buttons: {
                stop: {
                  label: "Stop",
                },
              },
            },
          },
          toasts: {
            error: {
              message: "Stream failed...",
            },
          },
        },
        noEvents: {
          text: "No events in the near future...",
        },
      },
    },
    notFound: {
      title: "Not Found • webstream",
      description: "webstream",
      text: "Page not found",
    },
    error: {
      title: "Error • webstream",
      description: "webstream",
      text: "Something went wrong",
      buttons: {
        retry: {
          label: "Retry",
        },
      },
    },
  },
};
