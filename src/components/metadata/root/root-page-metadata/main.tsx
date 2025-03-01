"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { RootPageMetadataInput } from "./types";

export function RootPageMetadata({}: RootPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "poppy" })),
    title: _(msg({ message: "poppy" })),
  });

  return null;
}
