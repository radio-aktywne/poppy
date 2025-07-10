"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Logo as InternalLogo } from "@radio-aktywne/ui";
import NextImage from "next/image";

import { LogoInput } from "./types";

export function Logo({}: LogoInput) {
  const { _ } = useLingui();

  return (
    <InternalLogo
      alt={_(msg({ message: "Logo" }))}
      component={NextImage}
      h="auto"
      unoptimized={true}
      w="50%"
    />
  );
}
