import { msg } from "@lingui/macro";

export const errors = {
  generic: msg({
    message: "An error occurred while checking stream availability.",
  }),
  unauthorized: msg({
    message: "You are not authorized to check stream availability.",
  }),
};
