import { getOctopusSRTAddress } from "../../../../lib/get-octopus-srt-address";
import { StreamingWidget } from "../../../widgets/streaming-widget";
import { RootPageViewInput } from "./types";

export function RootPageView({}: RootPageViewInput) {
  const { address: target } = getOctopusSRTAddress();

  return <StreamingWidget target={target} />;
}
