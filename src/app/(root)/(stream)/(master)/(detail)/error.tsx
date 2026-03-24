"use client";

import { msg } from "@lingui/core/macro";

import type { ErrorInput, ErrorMetadataUtilityInput } from "../../../../types";

import { Metadata } from "../../../../../isomorphic/metadata/components/metadata";
import { StreamDetailErrorView } from "./error.view";

function getTitle({}: ErrorMetadataUtilityInput = {}) {
  return msg({ message: "Error • poppy" });
}

export default function StreamDetailError({ reset }: ErrorInput) {
  return (
    <>
      <Metadata title={getTitle()} />
      <StreamDetailErrorView reset={reset} />
    </>
  );
}
