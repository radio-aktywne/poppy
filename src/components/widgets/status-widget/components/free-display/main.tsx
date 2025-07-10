"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Badge, Box } from "@mantine/core";

import { FreeDisplayInput } from "./types";

export function FreeDisplay({}: FreeDisplayInput) {
  const { _ } = useLingui();

  return (
    <Box w="100%">
      <Badge color="ra-green" fullWidth size="xl" variant="light">
        {_(msg({ message: "Free" }))}
      </Badge>
    </Box>
  );
}
