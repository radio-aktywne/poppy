export type CreateOfferCodecConfig = {
  [key: string]: string;
};

export type CreateOfferCodecsConfig = {
  [codec: string]: CreateOfferCodecConfig;
};

export type CreateOfferInput = {
  codecs?: CreateOfferCodecsConfig;
  peer: RTCPeerConnection;
};

export type CreateOfferOutput = {
  offer: string;
};
