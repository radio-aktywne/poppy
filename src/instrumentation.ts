import { createClient as createBeaverClient } from "./common/apis/beaver/client";
import { Sdk as BeaverSDK } from "./common/apis/beaver/sdk";
import { createClient as createICanHazDadJokeClient } from "./common/apis/icanhazdadjoke/client";
import { Sdk as ICanHazDadJokeSDK } from "./common/apis/icanhazdadjoke/sdk";
import { createClient as createLorisClient } from "./common/apis/loris/client";
import { Sdk as LorisSDK } from "./common/apis/loris/sdk";
import { createClient as createOctopusClient } from "./common/apis/octopus/client";
import { Sdk as OctopusSDK } from "./common/apis/octopus/sdk";
import { createClient as createWhipClient } from "./common/apis/whip/client";
import { Sdk as WhipSDK } from "./common/apis/whip/sdk";
import { createUrl } from "./common/generic/lib/create-url";
import { loadConfig } from "./server/config/lib/load-config";
import { state } from "./server/state/vars/state";

export async function register() {
  const { config } = await loadConfig();

  const apis = {
    beaver: new BeaverSDK({
      client: createBeaverClient({
        baseUrl: createUrl({
          host: config.apis.beaver.host,
          path: config.apis.beaver.path,
          port: config.apis.beaver.port,
          scheme: config.apis.beaver.scheme,
        }).url,
      }),
    }),

    icanhazdadjoke: new ICanHazDadJokeSDK({
      client: createICanHazDadJokeClient({
        baseUrl: createUrl({
          host: config.apis.icanhazdadjoke.host,
          path: config.apis.icanhazdadjoke.path,
          port: config.apis.icanhazdadjoke.port,
          scheme: config.apis.icanhazdadjoke.scheme,
        }).url,
      }),
    }),

    loris: new LorisSDK({
      client: createLorisClient({
        baseUrl: createUrl({
          host: config.apis.loris.host,
          path: config.apis.loris.path,
          port: config.apis.loris.port,
          scheme: config.apis.loris.scheme,
        }).url,
      }),
    }),

    octopus: new OctopusSDK({
      client: createOctopusClient({
        baseUrl: createUrl({
          host: config.apis.octopus.host,
          path: config.apis.octopus.path,
          port: config.apis.octopus.port,
          scheme: config.apis.octopus.scheme,
        }).url,
      }),
    }),

    whip: new WhipSDK({
      client: createWhipClient({
        baseUrl: createUrl({
          host: config.apis.whip.host,
          path: config.apis.whip.path,
          port: config.apis.whip.port,
          scheme: config.apis.whip.scheme,
        }).url,
      }),
    }),
  };

  state.current = {
    apis: apis,
    config: config,
  };
}
