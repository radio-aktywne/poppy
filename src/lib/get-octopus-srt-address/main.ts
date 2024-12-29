import "server-only";

import { defaults } from "./constants";
import { GetOctopusSRTAddressInput, GetOctopusSRTAddressOutput } from "./types";

export function getOctopusSRTAddress({}: GetOctopusSRTAddressInput = {}): GetOctopusSRTAddressOutput {
  const address = {
    host: process.env.POPPY__OCTOPUS__SRT__HOST || defaults.host,
    port:
      process.env.POPPY__OCTOPUS__SRT__PORT === undefined
        ? defaults.port
        : parseInt(process.env.POPPY__OCTOPUS__SRT__PORT, 10),
  };

  return { address: address };
}
