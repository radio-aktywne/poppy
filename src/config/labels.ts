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
      title: "emiweb",
      description: "emiweb",
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
      title: "Not Found • emiweb",
      description: "emiweb",
      text: "Page not found",
    },
    error: {
      title: "Error • emiweb",
      description: "emiweb",
      text: "Something went wrong",
      buttons: {
        retry: {
          label: "Retry",
        },
      },
    },
  },
};
