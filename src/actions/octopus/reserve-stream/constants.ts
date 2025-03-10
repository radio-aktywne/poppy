import { msg } from "@lingui/core/macro";

export const errors = {
  generic: msg({ message: "An error occurred while reserving stream." }),
  invalidInput: msg({ message: "Invalid input." }),
  streamReserved: msg({ message: "Stream is already reserved." }),
  unauthorized: msg({ message: "You are not authorized to reserve stream." }),
};
