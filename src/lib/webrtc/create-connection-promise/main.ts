import "client-only";

import {
  CreateConnectionPromiseInput,
  CreateConnectionPromiseOutput,
} from "./types";

export function createConnectionPromise({
  peer,
}: CreateConnectionPromiseInput): CreateConnectionPromiseOutput {
  const promise = new Promise<boolean>((resolve) => {
    const handle = () => {
      switch (peer.connectionState) {
        case "connected":
          peer.removeEventListener("connectionstatechange", handle);
          resolve(true);
          break;
        case "failed":
          peer.removeEventListener("connectionstatechange", handle);
          resolve(false);
          break;
      }
    };

    peer.addEventListener("connectionstatechange", handle);
  });

  return { promise: promise };
}
