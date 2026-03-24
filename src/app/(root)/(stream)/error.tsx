"use client";

import { msg } from "@lingui/core/macro";

import type { ErrorInput, ErrorMetadataUtilityInput } from "../../types";

import { Metadata } from "../../../isomorphic/metadata/components/metadata";
import { StreamErrorView } from "./error.view";

function getTitle({}: ErrorMetadataUtilityInput = {}) {
  return msg({ message: "Error • poppy" });
}

export default function StreamError({ reset }: ErrorInput) {
  return (
    <>
      <Metadata title={getTitle()} />
      <StreamErrorView reset={reset} />
    </>
  );
}
