import {
  MasterDetailLayout,
  MasterDetailLayoutDetailPanel,
  MasterDetailLayoutMasterPanel,
} from "@radio-aktywne/ui";

import { StatusWidget } from "../../../components/widgets/status-widget";
import { checkStreamAvailability } from "../../../lib/octopus/check-stream-availability";
import { MainLayoutInput } from "./types";

export const dynamic = "force-dynamic";

export default async function MainLayout({ children }: MainLayoutInput) {
  const availability = await checkStreamAvailability();

  return (
    <MasterDetailLayout>
      <MasterDetailLayoutMasterPanel>
        <StatusWidget availability={availability} />
      </MasterDetailLayoutMasterPanel>
      <MasterDetailLayoutDetailPanel>{children}</MasterDetailLayoutDetailPanel>
    </MasterDetailLayout>
  );
}
