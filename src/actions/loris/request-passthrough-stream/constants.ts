import { msg } from "@lingui/macro";

export const errors = {
  generic: msg({
    message: "An error occurred while requesting passthrough stream.",
  }),
  invalidInput: msg({ message: "Invalid input." }),
  streamNotAvailable: msg({ message: "Stream not available." }),
};
