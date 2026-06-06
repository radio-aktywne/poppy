import { connection } from "next/server";

import type { LayoutInput } from "../../../types";
import type { Keys } from "./types";

import { Authenticated } from "../../../../server/access/components/authenticated";
import { StreamMasterLayoutView } from "./layout.view";

export default async function StreamMasterLayout({
  children,
}: LayoutInput<Keys.Path, Keys.Slots>) {
  await connection();

  return (
    <Authenticated>
      <StreamMasterLayoutView>{children}</StreamMasterLayoutView>
    </Authenticated>
  );
}
