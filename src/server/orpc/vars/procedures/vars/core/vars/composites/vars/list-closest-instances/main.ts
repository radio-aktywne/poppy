import type { SetNonNullableDeep } from "type-fest";

import { call } from "@orpc/server";
import { flatMap, groupBy, minBy, sortBy } from "es-toolkit/array";
import { mapValues } from "es-toolkit/object";

import { dayjs } from "../../../../../../../../../../common/dates/vars/dayjs";
import { orpcServerRootBase } from "../../../../../../../bases/root";
import { authenticatedMiddleware } from "../../../../../../../middleware/authenticated";
import { schedule } from "../../../schedule";

export const listClosestInstances =
  orpcServerRootBase.core.composites.listClosestInstances
    .use(authenticatedMiddleware)
    .handler(async ({ input }) => {
      const reference = input.reference
        ? dayjs.utc(input.reference)
        : dayjs.utc();

      const scheduleListData = await call(schedule.list, {
        end: input.end,
        include: { show: true },
        limit: null,
        start: input.start,
        where: input.where,
      });

      const schedules = scheduleListData.schedules as SetNonNullableDeep<
        typeof scheduleListData.schedules,
        "0.event.show"
      >;

      const results = sortBy(
        Object.values(
          mapValues(
            groupBy(
              flatMap(schedules, (schedule) =>
                schedule.instances.map((instance) => ({
                  event: schedule.event,
                  instance: instance,
                })),
              ),
              ({ event }) => event.show.id,
            ),
            (group) =>
              minBy(group, ({ event, instance }) =>
                Math.abs(
                  dayjs.tz(instance.start, event.timezone).diff(reference),
                ),
              )!,
          ),
        ),
        [
          ({ event, instance }) =>
            Math.abs(dayjs.tz(instance.start, event.timezone).diff(reference)) *
            (input.order === "asc" ? 1 : -1),
        ],
      );

      return { results: results };
    });
