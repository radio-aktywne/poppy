import {
  MasterDetailLayout,
  MasterDetailLayoutMasterPanel,
} from "@radio-aktywne/ui";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import type { LayoutViewInput } from "../../../types";
import type { Schemas } from "./schemas";
import type { Keys } from "./types";

import { StatusWidget } from "../../../../client/core/components/status-widget";
import { LoadingWidget } from "../../../../common/core/components/generic/loading-widget";
import { Hydrated } from "../../../../isomorphic/generic/components/hydrated";
import { orpcServerSideQueryClient } from "../../../../server/orpc/vars/clients";
import { getQueryClient } from "../../../../server/query/lib/get-query-client";

export async function StreamMasterLayoutView({
  children,
}: LayoutViewInput<typeof Schemas.Path, Keys.Slots>) {
  const { queryClient } = getQueryClient();

  void queryClient.prefetchQuery(
    orpcServerSideQueryClient.core.stream.check.queryOptions(),
  );

  return (
    <MasterDetailLayout>
      <MasterDetailLayoutMasterPanel>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Hydrated fallback={<LoadingWidget />}>
            <StatusWidget />
          </Hydrated>
        </HydrationBoundary>
      </MasterDetailLayoutMasterPanel>
      {children}
    </MasterDetailLayout>
  );
}
