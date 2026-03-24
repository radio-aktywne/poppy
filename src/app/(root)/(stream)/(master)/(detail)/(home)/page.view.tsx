import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import type { PageViewInput } from "../../../../../types";
import type { Schemas } from "./schemas";

import { StreamWidget } from "../../../../../../client/core/components/stream-widget";
import { LoadingWidget } from "../../../../../../common/core/components/generic/loading-widget";
import { Hydrated } from "../../../../../../isomorphic/generic/components/hydrated";
import { orpcServerSideQueryClient } from "../../../../../../server/orpc/vars/clients";
import { getQueryClient } from "../../../../../../server/query/lib/get-query-client";

export async function HomePageView({}: PageViewInput<
  typeof Schemas.Path,
  typeof Schemas.Query
>) {
  const { queryClient } = getQueryClient();

  void queryClient.prefetchQuery(
    orpcServerSideQueryClient.core.stream.check.queryOptions(),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Hydrated fallback={<LoadingWidget />}>
        <StreamWidget />
      </Hydrated>
    </HydrationBoundary>
  );
}
