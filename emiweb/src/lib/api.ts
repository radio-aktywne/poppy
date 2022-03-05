import { ClientChannel, geckos } from "@geckos.io/client";

const stripPrefixSlash = (path: string): string => {
  return path.startsWith("/") ? path.slice(1) : path;
};

const stripSuffixSlash = (path: string): string => {
  return path.endsWith("/") ? path.slice(0, -1) : path;
};

const toApiPath = (endpoint: string): string => {
  return stripSuffixSlash(`/api/${stripPrefixSlash(endpoint)}`);
};

export const get = async (endpoint: string, headers: {} = {}): Promise<any> => {
  const path = toApiPath(endpoint);
  const response = await fetch(path, { headers: headers });
  return await response.json();
};

export const post = async (
  endpoint: string,
  body: any = undefined,
  headers: {} = {}
): Promise<any> => {
  const path = toApiPath(endpoint);
  const init = {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  };
  const response = await fetch(path, init);
  return await response.json();
};

export const createWebrtcChannel = (endpoint: string): ClientChannel => {
  const path = toApiPath(endpoint);
  const url = (location?.origin || "") + path;
  return geckos({ url: url, port: null });
};
