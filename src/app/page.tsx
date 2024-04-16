import { getSchedules } from "../actions";
import { NoEventsWidget, StreamingWidget } from "../components";
import { labels } from "../config/labels";

export const dynamic = "force-dynamic";

export default async function IndexPage() {
  const { data: schedules, error } = await getSchedules();

  if (error !== undefined) throw new Error(error);

  if (schedules === undefined || schedules.length === 0)
    return <NoEventsWidget labels={labels.pages.index.widgets.noEvents} />;

  return (
    <StreamingWidget
      schedules={schedules}
      labels={labels.pages.index.widgets.streaming}
    />
  );
}
