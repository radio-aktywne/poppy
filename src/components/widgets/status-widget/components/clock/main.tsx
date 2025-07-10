"use client";

import { Title } from "@mantine/core";

import { useNow } from "../../../../../hooks/use-now";
import { ClockInput } from "./types";

export function Clock({}: ClockInput) {
  const { now } = useNow();

  return <Title>{now.local().format("LTS")}</Title>;
}
