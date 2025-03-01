import { msg } from "@lingui/core/macro";

export const errors = {
  generic: msg({
    message: "An error occurred while requesting passthrough stream.",
  }),
  invalidInput: msg({ message: "Invalid input." }),
  streamNotAvailable: msg({ message: "Stream not available." }),
  unauthorized: msg({
    message: "You are not authorized to request passthrough stream.",
  }),
};
