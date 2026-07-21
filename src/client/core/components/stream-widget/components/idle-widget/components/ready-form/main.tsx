import { msg } from "@lingui/core/macro";
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Center } from "@radio-aktywne/ui";
import { useCallback, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";

import type { ReadyFormInput } from "./types";

import { dayjs } from "../../../../../../../../common/dates/vars/dayjs";
import { getValidationIssue } from "../../../../../../../../common/orpc/lib/get-validation-issue";
import { isOrpcDefinedError } from "../../../../../../../../common/orpc/lib/is-orpc-defined-error";
import { useForm } from "../../../../../../../../isomorphic/core/hooks/use-form";
import { useLocalization } from "../../../../../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../../../../../isomorphic/notifications/hooks/use-notifications";
import {
  CreateEventForm,
  type CreateEventFormSubmitInput,
} from "./components/create-event-form";
import {
  useAvailable,
  useEarliestLatest,
  useEventsCreateMutation,
  useFilteredInstances,
  useInitialValues,
  useInstances,
  useSelectedShow,
  useShows,
} from "./hooks";
import { Schemas } from "./schemas";

export function ReadyForm({
  initialValues: partialInitialValues,
  onError,
  onSubmit,
}: ReadyFormInput) {
  const [modalOpened, { close: closeModal, open: openModal }] =
    useDisclosure(false);
  const [
    eventCreating,
    { close: stopEventCreating, open: startEventCreating },
  ] = useDisclosure(false);

  const { localization } = useLocalization();
  const { notifications } = useNotifications();

  const available = useAvailable();
  const instances = useInstances();
  const shows = useShows(instances);
  const initialValues = useInitialValues(partialInitialValues, instances);
  const [earliest, latest] = useEarliestLatest(instances);

  const [selectedShow, setSelectedShow] = useSelectedShow(
    initialValues,
    instances,
  );
  const filteredInstances = useFilteredInstances(instances, selectedShow);

  const eventsCreateMutation = useEventsCreateMutation();

  const [valid, setValid] = useState(
    initialValues.instance && initialValues.title,
  );
  const { form, handleFormSubmit, submitting } = useForm({
    initialValues: initialValues,
    onError: onError,
    onSubmit: onSubmit,
    onValuesChange: (values) =>
      setValid((values.instance ?? null) && (values.title ?? null)),
    schema: Schemas.Values,
  });

  const handleShowChange = useCallback(
    (value: null | string) => {
      setSelectedShow(value);

      const instance = instances.find(
        (instance) => (instance.event.show?.id ?? null) === value,
      );

      form.setFieldValue(
        "instance",
        instance
          ? `${instance.event.id}/${instance.start}/${instance.duration}`
          : null,
      );

      form.setFieldValue("title", instance?.event.show?.title ?? null);
    },
    [form.setFieldValue, instances],
  );

  const handleCreateEventSubmit = useCallback(
    async ({ values }: CreateEventFormSubmitInput) => {
      if (eventCreating) return;

      startEventCreating();

      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const event = await eventsCreateMutation.mutateAsync({
          data: {
            duration: dayjs
              .duration(
                dayjs
                  .tz(values.end.replace(" ", "T"), timezone)
                  .diff(dayjs.tz(values.start.replace(" ", "T"), timezone)),
              )
              .toISOString(),
            showId: selectedShow,
            start: values.start.replace(" ", "T"),
            timezone: timezone,
            type: "live",
          },
        });

        notifications.success({ message: msg({ message: "Event created" }) });

        form.setFieldValue(
          "instance",
          `${event.id}/${event.start}/${event.duration}`,
        );

        closeModal();
      } catch (error) {
        if (isOrpcDefinedError(error)) {
          if (error.code === "BAD_REQUEST") {
            notifications.error({ message: msg({ message: "Invalid input" }) });

            return {
              errors: {
                start: getValidationIssue({ error: error, path: "data.start" })
                  .message,
              },
            };
          }

          if (error.code === "CONFLICT") {
            notifications.error({
              message: msg({ message: "Conflicting input" }),
            });

            return;
          }
        }

        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });

        throw error;
      } finally {
        stopEventCreating();
      }
    },
    [
      closeModal,
      eventCreating,
      eventsCreateMutation.mutateAsync,
      form.setFieldValue,
      notifications.error,
      notifications.success,
      selectedShow,
      startEventCreating,
      stopEventCreating,
    ],
  );

  return (
    <>
      <Modal
        onClose={closeModal}
        opened={modalOpened}
        title={localization.localize(msg({ message: "Create one-time event" }))}
      >
        <Stack>
          <CreateEventForm onSubmit={handleCreateEventSubmit} />
        </Stack>
      </Modal>
      <form onSubmit={handleFormSubmit} style={{ display: "contents" }}>
        <Center>
          <Stack w="50%">
            <Select
              clearable={true}
              data={shows.map((show) => ({
                label: show.title,
                value: show.id,
              }))}
              defaultValue={selectedShow}
              label={localization.localize(msg({ message: "Show" }))}
              onChange={handleShowChange}
              placeholder={localization.localize(msg({ message: "No show" }))}
            />
            <Group align="flex-end" gap="xs">
              <Select
                clearable={true}
                data={filteredInstances.map((instance) => ({
                  label: dayjs
                    .tz(instance.start, instance.event.timezone)
                    .locale(localization.locale)
                    .local()
                    .format(
                      !latest || latest.isSame(earliest, "week")
                        ? "dddd, LT"
                        : "LLLL",
                    ),
                  value: `${instance.event.id}/${instance.start}/${instance.duration}`,
                }))}
                flex={1}
                key={form.key("instance")}
                label={localization.localize(msg({ message: "Instance" }))}
                placeholder={localization.localize(
                  msg({ message: "Select instance" }),
                )}
                required={true}
                {...form.getInputProps("instance")}
              />
              <ActionIcon color="inherit" onClick={openModal} size="input-sm">
                <MdOutlineAddBox size="66%" />
              </ActionIcon>
            </Group>
            <TextInput
              key={form.key("title")}
              label={localization.localize(msg({ message: "Title" }))}
              placeholder={localization.localize(msg({ message: "Set title" }))}
              required={true}
              {...form.getInputProps("title")}
            />
            <Checkbox
              key={form.key("record")}
              label={localization.localize(
                msg({ message: "Record the stream" }),
              )}
              {...form.getInputProps("record", { type: "checkbox" })}
            />
          </Stack>
        </Center>
        <Button
          disabled={!available || eventCreating || !valid}
          loaderProps={{ type: "dots" }}
          loading={submitting}
          mt="auto"
          style={{ flexShrink: 0 }}
          type="submit"
        >
          {localization.localize(msg({ message: "Ready" }))}
        </Button>
      </form>
    </>
  );
}
