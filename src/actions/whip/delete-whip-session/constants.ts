import { msg } from "@lingui/core/macro";

export const errors = {
  generic: msg({ message: "An error occurred while deleting WHIP session." }),
  notFound: msg({ message: "WHIP session not found." }),
  unauthorized: msg({
    message: "You are not authorized to delete WHIP session.",
  }),
};
