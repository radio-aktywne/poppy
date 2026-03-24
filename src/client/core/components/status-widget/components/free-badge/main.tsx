import { msg } from "@lingui/core/macro";
import { Badge } from "@mantine/core";

import type { FreeBadgeInput } from "./types";

import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";

export function FreeBadge({}: FreeBadgeInput) {
  const { localization } = useLocalization();

  return (
    <Badge
      color="ra-green"
      display="grid"
      fullWidth
      mt="auto"
      radius={0}
      size="xl"
      style={{ flexShrink: 0 }}
      variant="light"
    >
      {localization.localize(msg({ message: "Free" }))}
    </Badge>
  );
}
