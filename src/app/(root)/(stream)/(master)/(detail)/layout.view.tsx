import { MasterDetailLayoutDetailPanel } from "@radio-aktywne/ui";

import type { LayoutViewInput } from "../../../../types";
import type { Schemas } from "./schemas";
import type { Keys } from "./types";

export async function StreamDetailLayoutView({
  children,
}: LayoutViewInput<typeof Schemas.Path, Keys.Slots>) {
  return (
    <MasterDetailLayoutDetailPanel>{children}</MasterDetailLayoutDetailPanel>
  );
}
