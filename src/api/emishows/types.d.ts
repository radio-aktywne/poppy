/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/events": {
    /**
     * List events
     * @description List events that match the request.
     */
    get: operations["EventsList"];
    /**
     * Create event
     * @description Create a new event.
     */
    post: operations["EventsCreate"];
  };
  "/events/{id}": {
    /**
     * Get event
     * @description Get an event by ID.
     */
    get: operations["EventsIdGet"];
    /**
     * Delete event
     * @description Delete an event by ID.
     */
    delete: operations["EventsIdDelete"];
    /**
     * Update event
     * @description Update an event by ID.
     */
    patch: operations["EventsIdUpdate"];
  };
  "/ping": {
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
  };
  "/schedule": {
    /**
     * List schedules
     * @description List event schedules with instances between two dates.
     */
    get: operations["ScheduleList"];
  };
  "/shows": {
    /**
     * List shows
     * @description List shows that match the request.
     */
    get: operations["ShowsList"];
    /**
     * Create show
     * @description Create a new show.
     */
    post: operations["ShowsCreate"];
  };
  "/shows/{id}": {
    /**
     * Get show
     * @description Get a show by ID.
     */
    get: operations["ShowsIdGet"];
    /**
     * Delete show
     * @description Delete a show by ID.
     */
    delete: operations["ShowsIdDelete"];
    /**
     * Update show
     * @description Update a show by ID.
     */
    patch: operations["ShowsIdUpdate"];
  };
  "/sse": {
    /**
     * Get SSE stream
     * @description Get a stream of Server-Sent Events.
     */
    get: operations["SseSubscribe"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /**
     * EventCreateInput
     * @description Data to create an event.
     */
    EventCreateInput: {
      id?: string;
      showId?: string;
      /** @enum {string} */
      type: "live" | "replay" | "prerecorded";
      /** Format: date-time */
      start: string;
      /** Format: date-time */
      end: string;
      timezone: string;
      recurrence?: null | components["schemas"]["events_models_Recurrence"];
    };
    /** EventInstance */
    EventInstance: {
      /** Format: date-time */
      start: string;
      /** Format: date-time */
      end: string;
    };
    /** EventList */
    EventList: {
      /** @description Total number of events that matched the query. */
      count: number;
      /** @description Maximum number of returned events. */
      limit?: null | number;
      /** @description Number of events skipped. */
      offset?: null | number;
      /** @description Events that matched the request. */
      events: components["schemas"]["events_models_Event"][];
    };
    /**
     * EventUpdateInput
     * @description Data to update an event.
     */
    EventUpdateInput: {
      id?: string;
      /** @enum {string} */
      type?: "live" | "replay" | "prerecorded";
      /** Format: date-time */
      start?: string;
      /** Format: date-time */
      end?: string;
      timezone?: string;
      recurrence?: null | components["schemas"]["events_models_Recurrence"];
    };
    /** Schedule */
    Schedule: {
      event: components["schemas"]["schedule_models_Event"];
      /** @description Event instances. */
      instances: components["schemas"]["EventInstance"][];
    };
    /** ScheduleList */
    ScheduleList: {
      /** @description Total number of schedules that matched the query. */
      count: number;
      /** @description Maximum number of returned schedules. */
      limit?: null | number;
      /** @description Number of schedules skipped. */
      offset?: null | number;
      /** @description Schedules that matched the request. */
      schedules: components["schemas"]["Schedule"][];
    };
    /**
     * ShowCreateInput
     * @description Data to create a show.
     */
    ShowCreateInput: {
      id?: string;
      description?: null | string;
      title: string;
    };
    /** ShowList */
    ShowList: {
      /** @description Total number of shows that matched the query. */
      count: number;
      /** @description Maximum number of returned shows. */
      limit?: null | number;
      /** @description Number of shows skipped. */
      offset?: null | number;
      /** @description Shows that matched the request. */
      shows: components["schemas"]["shows_models_Show"][];
    };
    /**
     * ShowUpdateInput
     * @description Data to update a show.
     */
    ShowUpdateInput: {
      id?: string;
      title?: string;
      description?: null | string;
    };
    /** Event */
    events_models_Event: {
      /**
       * Format: uuid
       * @description Identifier of the event.
       */
      id: string;
      /**
       * @description Type of the event.
       * @enum {string}
       */
      type: "live" | "replay" | "prerecorded";
      /**
       * Format: uuid
       * @description Identifier of the show that the event belongs to.
       */
      showId: string;
      /** @description Show that the event belongs to. */
      show?: null | components["schemas"]["events_models_Show"];
      /**
       * Format: date-time
       * @description Start time of the event in event timezone.
       */
      start: string;
      /**
       * Format: date-time
       * @description End time of the event in event timezone.
       */
      end: string;
      /** @description Timezone of the event. */
      timezone: string;
      /** @description Recurrence rule of the event. */
      recurrence?: null | components["schemas"]["events_models_Recurrence"];
    };
    /** Recurrence */
    events_models_Recurrence: {
      /** @description Rule of the recurrence. */
      rule?: null | components["schemas"]["events_models_RecurrenceRule"];
      /** @description Included dates of the recurrence in event timezone. */
      include?: null | string[];
      /** @description Excluded dates of the recurrence in event timezone. */
      exclude?: null | string[];
    };
    /** RecurrenceRule */
    events_models_RecurrenceRule: {
      /**
       * @description Frequency of the recurrence.
       * @enum {string}
       */
      frequency:
        | "secondly"
        | "minutely"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly";
      /** @description End date of the recurrence in UTC. */
      until?: null | string;
      /** @description Number of occurrences of the recurrence. */
      count?: null | number;
      /** @description Interval of the recurrence. */
      interval?: null | number;
      /** @description Seconds of the recurrence. */
      bySeconds?: null | number[];
      /** @description Minutes of the recurrence. */
      byMinutes?: null | number[];
      /** @description Hours of the recurrence. */
      byHours?: null | number[];
      /** @description Weekdays of the recurrence. */
      byWeekdays?: null | components["schemas"]["events_models_WeekdayRule"][];
      /** @description Monthdays of the recurrence. */
      byMonthdays?: null | number[];
      /** @description Yeardays of the recurrence. */
      byYeardays?: null | number[];
      /** @description Weeks of the recurrence. */
      byWeeks?: null | number[];
      /** @description Months of the recurrence. */
      byMonths?: null | number[];
      /** @description Set positions of the recurrence. */
      bySetPositions?: null | number[];
      /**
       * @description Start day of the week.
       * @enum {null|string}
       */
      weekStart?:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
        | null;
    };
    /** Show */
    events_models_Show: {
      /** @description Identifier of the show. */
      id: string;
      /** @description Title of the show. */
      title: string;
      /** @description Description of the show. */
      description?: null | string;
      /** @description Events that the show belongs to. */
      events?: null | components["schemas"]["events_models_Event"][];
    };
    /** WeekdayRule */
    events_models_WeekdayRule: {
      /**
       * @description Day of the week.
       * @enum {string}
       */
      day:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday";
      /** @description Occurrence of the day in the year. */
      occurrence?: null | number;
    };
    /**
     * Event
     * @description Event data.
     */
    schedule_models_Event: {
      /**
       * Format: uuid
       * @description Identifier of the event.
       */
      id: string;
      /**
       * @description Type of the event.
       * @enum {string}
       */
      type: "live" | "replay" | "prerecorded";
      /**
       * Format: uuid
       * @description Identifier of the show that the event belongs to.
       */
      showId: string;
      /** @description Show that the event belongs to. */
      show?: null | components["schemas"]["schedule_models_Show"];
      /**
       * Format: date-time
       * @description Start time of the event in event timezone.
       */
      start: string;
      /**
       * Format: date-time
       * @description End time of the event in event timezone.
       */
      end: string;
      /** @description Timezone of the event. */
      timezone: string;
      /** @description Recurrence rule of the event. */
      recurrence?: null | components["schemas"]["schedule_models_Recurrence"];
    };
    /** Recurrence */
    schedule_models_Recurrence: {
      /** @description Rule of the recurrence. */
      rule?: null | components["schemas"]["schedule_models_RecurrenceRule"];
      /** @description Included dates of the recurrence in event timezone. */
      include?: null | string[];
      /** @description Excluded dates of the recurrence in event timezone. */
      exclude?: null | string[];
    };
    /** RecurrenceRule */
    schedule_models_RecurrenceRule: {
      /**
       * @description Frequency of the recurrence.
       * @enum {string}
       */
      frequency:
        | "secondly"
        | "minutely"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly";
      /** @description End date of the recurrence in UTC. */
      until?: null | string;
      /** @description Number of occurrences of the recurrence. */
      count?: null | number;
      /** @description Interval of the recurrence. */
      interval?: null | number;
      /** @description Seconds of the recurrence. */
      bySeconds?: null | number[];
      /** @description Minutes of the recurrence. */
      byMinutes?: null | number[];
      /** @description Hours of the recurrence. */
      byHours?: null | number[];
      /** @description Weekdays of the recurrence. */
      byWeekdays?:
        | null
        | components["schemas"]["schedule_models_WeekdayRule"][];
      /** @description Monthdays of the recurrence. */
      byMonthdays?: null | number[];
      /** @description Yeardays of the recurrence. */
      byYeardays?: null | number[];
      /** @description Weeks of the recurrence. */
      byWeeks?: null | number[];
      /** @description Months of the recurrence. */
      byMonths?: null | number[];
      /** @description Set positions of the recurrence. */
      bySetPositions?: null | number[];
      /**
       * @description Start day of the week.
       * @enum {null|string}
       */
      weekStart?:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
        | null;
    };
    /** Show */
    schedule_models_Show: {
      /** @description Identifier of the show. */
      id: string;
      /** @description Title of the show. */
      title: string;
      /** @description Description of the show. */
      description?: null | string;
      /** @description Events that the show belongs to. */
      events?: null | components["schemas"]["schedule_models_Event"][];
    };
    /** WeekdayRule */
    schedule_models_WeekdayRule: {
      /**
       * @description Day of the week.
       * @enum {string}
       */
      day:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday";
      /** @description Occurrence of the day in the year. */
      occurrence?: null | number;
    };
    /** Event */
    shows_models_Event: {
      /**
       * Format: uuid
       * @description Identifier of the event.
       */
      id: string;
      /**
       * @description Type of the event.
       * @enum {string}
       */
      type: "live" | "replay" | "prerecorded";
      /**
       * Format: uuid
       * @description Identifier of the show that the event belongs to.
       */
      showId: string;
      /** @description Show that the event belongs to. */
      show?: null | components["schemas"]["shows_models_Show"];
      /**
       * Format: date-time
       * @description Start time of the event in event timezone.
       */
      start: string;
      /**
       * Format: date-time
       * @description End time of the event in event timezone.
       */
      end: string;
      /** @description Timezone of the event. */
      timezone: string;
      /** @description Recurrence rule of the event. */
      recurrence?: null | components["schemas"]["shows_models_Recurrence"];
    };
    /** Recurrence */
    shows_models_Recurrence: {
      /** @description Rule of the recurrence. */
      rule?: null | components["schemas"]["shows_models_RecurrenceRule"];
      /** @description Included dates of the recurrence in event timezone. */
      include?: null | string[];
      /** @description Excluded dates of the recurrence in event timezone. */
      exclude?: null | string[];
    };
    /** RecurrenceRule */
    shows_models_RecurrenceRule: {
      /**
       * @description Frequency of the recurrence.
       * @enum {string}
       */
      frequency:
        | "secondly"
        | "minutely"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly";
      /** @description End date of the recurrence in UTC. */
      until?: null | string;
      /** @description Number of occurrences of the recurrence. */
      count?: null | number;
      /** @description Interval of the recurrence. */
      interval?: null | number;
      /** @description Seconds of the recurrence. */
      bySeconds?: null | number[];
      /** @description Minutes of the recurrence. */
      byMinutes?: null | number[];
      /** @description Hours of the recurrence. */
      byHours?: null | number[];
      /** @description Weekdays of the recurrence. */
      byWeekdays?: null | components["schemas"]["shows_models_WeekdayRule"][];
      /** @description Monthdays of the recurrence. */
      byMonthdays?: null | number[];
      /** @description Yeardays of the recurrence. */
      byYeardays?: null | number[];
      /** @description Weeks of the recurrence. */
      byWeeks?: null | number[];
      /** @description Months of the recurrence. */
      byMonths?: null | number[];
      /** @description Set positions of the recurrence. */
      bySetPositions?: null | number[];
      /**
       * @description Start day of the week.
       * @enum {null|string}
       */
      weekStart?:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
        | null;
    };
    /** Show */
    shows_models_Show: {
      /** @description Identifier of the show. */
      id: string;
      /** @description Title of the show. */
      title: string;
      /** @description Description of the show. */
      description?: null | string;
      /** @description Events that the show belongs to. */
      events?: null | components["schemas"]["shows_models_Event"][];
    };
    /** WeekdayRule */
    shows_models_WeekdayRule: {
      /**
       * @description Day of the week.
       * @enum {string}
       */
      day:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday";
      /** @description Occurrence of the day in the year. */
      occurrence?: null | number;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  /**
   * List events
   * @description List events that match the request.
   */
  EventsList: {
    parameters: {
      query?: {
        /** @description Maximum number of events to return. */
        limit?: null | number;
        /** @description Number of events to skip. */
        offset?: null | number;
        /** @description Filter to apply to find events. */
        where?: null | string;
        /** @description Advanced query to apply to find events. */
        query?: null | string;
        /** @description Relations to include in the response. */
        include?: null | string;
        /** @description Order to apply to the results. */
        order?: null | string;
      };
    };
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        headers: {};
        content: {
          "application/json": components["schemas"]["EventList"];
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            status_code: number;
            detail: string;
            extra?:
              | null
              | {
                  [key: string]: unknown;
                }
              | unknown[];
          };
        };
      };
    };
  };
  /**
   * Create event
   * @description Create a new event.
   */
  EventsCreate: {
    parameters: {
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["EventCreateInput"];
      };
    };
    responses: {
      /** @description Document created, URL follows */
      201: {
        headers: {};
        content: {
          "application/json": components["schemas"]["events_models_Event"];
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            status_code: number;
            detail: string;
            extra?:
              | null
              | {
                  [key: string]: unknown;
                }
              | unknown[];
          };
        };
      };
    };
  };
  /**
   * Get event
   * @description Get an event by ID.
   */
  EventsIdGet: {
    parameters: {
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
      };
      path: {
        /** @description Identifier of the event to get. */
        id: string;
      };
    };
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        headers: {};
        content: {
          "application/json": components["schemas"]["events_models_Event"];
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            status_code: number;
            detail: string;
            extra?:
              | null
              | {
                  [key: string]: unknown;
                }
              | unknown[];
          };
        };
      };
    };
  };
  /**
   * Delete event
   * @description Delete an event by ID.
   */
  EventsIdDelete: {
    parameters: {
      path: {
        /** @description Identifier of the event to delete. */
        id: string;
      };
    };
    responses: {
      /** @description Request fulfilled, nothing follows */
      204: {
        headers: {};
        content: {
          "application/json": null;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            status_code: number;
            detail: string;
            extra?:
              | null
              | {
                  [key: string]: unknown;
                }
              | unknown[];
          };
        };
      };
    };
  };
  /**
   * Update event
   * @description Update an event by ID.
   */
  EventsIdUpdate: {
    parameters: {
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
      };
      path: {
        /** @description Identifier of the event to update. */
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["EventUpdateInput"];
      };
    };
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        headers: {};
        content: {
          "application/json": components["schemas"]["events_models_Event"];
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            status_code: number;
            detail: string;
            extra?:
              | null
              | {
                  [key: string]: unknown;
                }
              | unknown[];
          };
        };
      };
    };
  };
  /**
   * Ping
   * @description Ping.
   */
  PingPing: {
    responses: {
      /** @description Request fulfilled, nothing follows */
      204: {
        headers: {
          "cache-control"?: string;
        };
        content: {
          "application/json": null;
        };
      };
    };
  };
  /**
   * Ping headers
   * @description Ping headers.
   */
  PingHeadping: {
    responses: {
      /** @description Request fulfilled, nothing follows */
      204: {
        headers: {
          "cache-control"?: string;
        };
        content: {
          "application/json": null;
        };
      };
    };
  };
  /**
   * List schedules
   * @description List event schedules with instances between two dates.
   */
  ScheduleList: {
    parameters: {
      query?: {
        /** @description Start time in UTC to filter events instances. */
        start?: null | string;
        /** @description End time in UTC to filter events instances. */
        end?: null | string;
        /** @description Maximum number of schedules to return. */
        limit?: null | number;
        /** @description Number of schedules to skip. */
        offset?: null | number;
        /** @description Filter to apply to find events. */
        where?: null | string;
        /** @description Relations to include in the response. */
        include?: null | string;
        /** @description Order to apply to the results. */
        order?: null | string;
      };
    };
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        headers: {};
        content: {
          "application/json": components["schemas"]["ScheduleList"];
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            status_code: number;
            detail: string;
            extra?:
              | null
              | {
                  [key: string]: unknown;
                }
              | unknown[];
          };
        };
      };
    };
  };
  /**
   * List shows
   * @description List shows that match the request.
   */
  ShowsList: {
    parameters: {
      query?: {
        /** @description Maximum number of shows to return. */
        limit?: null | number;
        /** @description Number of shows to skip. */
        offset?: null | number;
        /** @description Filter to apply to find shows. */
        where?: null | string;
        /** @description Relations to include in the response. */
        include?: null | string;
        /** @description Order to apply to the results. */
        order?: null | string;
      };
    };
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        headers: {};
        content: {
          "application/json": components["schemas"]["ShowList"];
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            status_code: number;
            detail: string;
            extra?:
              | null
              | {
                  [key: string]: unknown;
                }
              | unknown[];
          };
        };
      };
    };
  };
  /**
   * Create show
   * @description Create a new show.
   */
  ShowsCreate: {
    parameters: {
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ShowCreateInput"];
      };
    };
    responses: {
      /** @description Document created, URL follows */
      201: {
        headers: {};
        content: {
          "application/json": components["schemas"]["shows_models_Show"];
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            status_code: number;
            detail: string;
            extra?:
              | null
              | {
                  [key: string]: unknown;
                }
              | unknown[];
          };
        };
      };
    };
  };
  /**
   * Get show
   * @description Get a show by ID.
   */
  ShowsIdGet: {
    parameters: {
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
      };
      path: {
        /** @description Identifier of the show to get. */
        id: string;
      };
    };
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        headers: {};
        content: {
          "application/json": components["schemas"]["shows_models_Show"];
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            status_code: number;
            detail: string;
            extra?:
              | null
              | {
                  [key: string]: unknown;
                }
              | unknown[];
          };
        };
      };
    };
  };
  /**
   * Delete show
   * @description Delete a show by ID.
   */
  ShowsIdDelete: {
    parameters: {
      path: {
        /** @description Identifier of the show to delete. */
        id: string;
      };
    };
    responses: {
      /** @description Request fulfilled, nothing follows */
      204: {
        headers: {};
        content: {
          "application/json": null;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            status_code: number;
            detail: string;
            extra?:
              | null
              | {
                  [key: string]: unknown;
                }
              | unknown[];
          };
        };
      };
    };
  };
  /**
   * Update show
   * @description Update a show by ID.
   */
  ShowsIdUpdate: {
    parameters: {
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
      };
      path: {
        /** @description Identifier of the show to update. */
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ShowUpdateInput"];
      };
    };
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        headers: {};
        content: {
          "application/json": components["schemas"]["shows_models_Show"];
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            status_code: number;
            detail: string;
            extra?:
              | null
              | {
                  [key: string]: unknown;
                }
              | unknown[];
          };
        };
      };
    };
  };
  /**
   * Get SSE stream
   * @description Get a stream of Server-Sent Events.
   */
  SseSubscribe: {
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        headers: {
          /** @description File size in bytes */
          "content-length"?: string;
          /** @description Last modified data-time in RFC 2822 format */
          "last-modified"?: string;
          /** @description Entity tag */
          etag?: string;
        };
        content: {
          "": string;
        };
      };
    };
  };
}
