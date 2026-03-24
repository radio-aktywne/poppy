import { connection } from "next/server";

import type { LoadingInput } from "../../../../types";

import { StreamDetailLoadingView } from "./loading.view";

export default async function StreamDetailLoading({}: LoadingInput) {
  await connection();

  return <StreamDetailLoadingView />;
}
