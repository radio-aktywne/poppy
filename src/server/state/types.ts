import "server-only";

import type { Sdk as BeaverSDK } from "../../common/apis/beaver/sdk";
import type { Sdk as ICanHazDadJokeSDK } from "../../common/apis/icanhazdadjoke/sdk";
import type { Sdk as LorisSDK } from "../../common/apis/loris/sdk";
import type { Sdk as OctopusSDK } from "../../common/apis/octopus/sdk";
import type { Sdk as WhipSDK } from "../../common/apis/whip/sdk";
import type { Config } from "../config/types";

export type APIs = {
  beaver: BeaverSDK;
  icanhazdadjoke: ICanHazDadJokeSDK;
  loris: LorisSDK;
  octopus: OctopusSDK;
  whip: WhipSDK;
};

export type State = {
  apis: APIs;
  config: Config;
};
