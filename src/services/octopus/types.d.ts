/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export type paths = {
  "/check": {
    delete?: never;
    /**
     * Check availability
     * @description Check the availability of the stream.
     */
    get: operations["CheckCheck"];
    head?: never;
    options?: never;
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    patch?: never;
    post?: never;
    put?: never;
    trace?: never;
  };
  "/ping": {
    delete?: never;
    /**
     * Ping
     * @description Ping.
     */
    get: operations["PingPing"];
    /**
     * Ping headers
     * @description Ping headers.
     */
    head: operations["PingHeadping"];
    options?: never;
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    patch?: never;
    post?: never;
    put?: never;
    trace?: never;
  };
  "/reserve": {
    delete?: never;
    get?: never;
    head?: never;
    options?: never;
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    patch?: never;
    /**
     * Reserve a stream
     * @description Reserve a stream.
     */
    post: operations["ReserveReserve"];
    put?: never;
    trace?: never;
  };
  "/sse": {
    delete?: never;
    /**
     * Get SSE stream
     * @description Get a stream of Server-Sent Events.
     */
    get: operations["SseSubscribe"];
    head?: never;
    options?: never;
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    patch?: never;
    post?: never;
    put?: never;
    trace?: never;
  };
};
export type webhooks = { [key: string]: never };
export type components = {
  headers: never;
  parameters: never;
  pathItems: never;
  requestBodies: never;
  responses: never;
  schemas: {
    /** Availability */
    Availability: {
      /**
       * Format: date-time
       * @description Time in UTC at which the availability was checked.
       */
      checkedAt: string;
      /** @description Identifier of the event that is currently being streamed. */
      event?: null | string;
    };
    /**
     * Credentials
     * @description Credentials to use to connect to the stream.
     */
    Credentials: {
      /**
       * Format: date-time
       * @description Time in UTC at which the token expires if not used.
       */
      expiresAt: string;
      /** @description Token to use to connect to the stream. */
      token: string;
    };
    /**
     * ReserveRequestData
     * @description Data for the request.
     */
    ReserveRequestData: {
      /**
       * Format: uuid
       * @description Identifier of the event to reserve the stream for.
       */
      event: string;
      /**
       * @description Format of the audio in the stream.
       * @default ogg
       * @enum {string}
       */
      format: "ogg";
      /**
       * @description Whether to record the stream.
       * @default false
       */
      record: boolean;
    };
    /** ReserveResponseData */
    ReserveResponseData: {
      credentials: components["schemas"]["Credentials"];
      /** @description Port to use to connect to the stream. */
      port: number;
    };
  };
};
export type $defs = { [key: string]: never };
export type operations = {
  CheckCheck: {
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        content: {
          "application/json": components["schemas"]["Availability"];
        };
        headers: {
          [name: string]: unknown;
        };
      };
    };
  };
  PingHeadping: {
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, nothing follows */
      204: {
        content: {
          "application/json": null;
        };
        headers: {
          [name: string]: unknown;
          "cache-control"?: string;
        };
      };
    };
  };
  PingPing: {
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, nothing follows */
      204: {
        content: {
          "application/json": null;
        };
        headers: {
          [name: string]: unknown;
          "cache-control"?: string;
        };
      };
    };
  };
  ReserveReserve: {
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ReserveRequestData"];
      };
    };
    responses: {
      /** @description Document created, URL follows */
      201: {
        content: {
          "application/json": components["schemas"]["ReserveResponseData"];
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Conflict */
      409: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Unprocessable Content */
      422: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
    };
  };
  SseSubscribe: {
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        content: {
          "": string;
        };
        headers: {
          [name: string]: unknown;
          /** @description File size in bytes */
          "content-length"?: string;
          /** @description Entity tag */
          etag?: string;
          /** @description Last modified data-time in RFC 2822 format */
          "last-modified"?: string;
        };
      };
    };
  };
};
