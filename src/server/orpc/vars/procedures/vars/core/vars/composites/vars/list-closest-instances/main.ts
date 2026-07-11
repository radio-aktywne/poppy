import type { SetNonNullableDeep } from "type-fest";

import { call } from "@orpc/server";
import { groupBy, minBy, sortBy } from "es-toolkit/array";
import { mapValues, toMerged } from "es-toolkit/object";

import { dayjs } from "../../../../../../../../../../common/dates/vars/dayjs";
import { orpcServerRootBase } from "../../../../../../../bases/root";
import { authenticatedMiddleware } from "../../../../../../../middleware/authenticated";
import { instances } from "../../../instances";

export const listClosestInstances =
  orpcServerRootBase.core.composites.listClosestInstances
    .use(authenticatedMiddleware)
    .handler(async ({ input }) => {
      const reference = input.reference
        ? dayjs.utc(input.reference)
        : dayjs.utc();

      const instancesListData = await call(instances.list, {
        end: input.end,
        include: { event: { include: { show: true } } },
        start: input.start,
        where: toMerged(input.where ?? {}, {
          event: { isNot: { showId: null } },
        }),
      });

      const all = instancesListData.instances as SetNonNullableDeep<
        typeof instancesListData.instances,
        "0.event" | "0.event.show"
      >;

      const closest = sortBy(
        Object.values(
          mapValues(
            groupBy(all, (instance) => instance.event.show.id),
            (group) =>
              minBy(group, (instance) =>
                Math.abs(
                  dayjs
                    .tz(instance.start, instance.event.timezone)
                    .diff(reference),
                ),
              )!,
          ),
        ),
        [
          (instance) =>
            Math.abs(
              dayjs.tz(instance.start, instance.event.timezone).diff(reference),
            ) * (input.order === "asc" ? 1 : -1),
        ],
      );

      return { instances: closest };
    });
