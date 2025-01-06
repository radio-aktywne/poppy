"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { AuthErrorPageMetadataInput } from "./types";

export function AuthErrorPageMetadata({}: AuthErrorPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "poppy" })),
    title: _(msg({ message: "Auth error • poppy" })),
  });

  return null;
}
