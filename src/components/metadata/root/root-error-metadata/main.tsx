"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { RootErrorMetadataInput } from "./types";

export function RootErrorMetadata({}: RootErrorMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "poppy" })),
    title: _(msg({ message: "Error • poppy" })),
  });

  return null;
}
