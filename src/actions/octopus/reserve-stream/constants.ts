import { msg } from "@lingui/macro";

export const errors = {
  generic: msg({ message: "An error occurred while reserving stream." }),
  invalidInput: msg({ message: "Invalid input." }),
  streamReserved: msg({ message: "Stream is already reserved." }),
};
