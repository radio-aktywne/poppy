export type SRTAddress = {
  host: string;
  port: number;
};

export type GetOctopusSRTAddressInput = {
  [key: string]: never;
};

export type GetOctopusSRTAddressOutput = {
  address: SRTAddress;
};
