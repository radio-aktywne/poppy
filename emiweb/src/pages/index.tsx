import * as React from "react";
import { useState } from "react";
import Layout from "../components/layout";
import { createWebrtcChannel, post } from "../lib/api";
import { AudioRecorder } from "../lib/media";
import { ClientChannel } from "@geckos.io/client";
import { Session } from "@ory/client";
import ory from "../lib/ory";

const title: string = "emiweb";
const recorder: AudioRecorder = new AudioRecorder();

export default function Index({ loginUrl }) {
  const [session, setSession] = useState<Session | undefined>();
  const [streamTitle, setStreamTitle] = useState<string>("");
  const [channel, setChannel] = useState<ClientChannel | undefined>(undefined);

  const handleStreamTitleChange = (event) => {
    setStreamTitle(event.target.value);
  };
  const handleStartClick = async () => {
    if (recorder.isRecording()) return;
    const response = await post("/stream/reserve", {
      event: {
        show: {
          label: streamTitle || undefined,
          metadata: {
            title: streamTitle || undefined,
          },
        },
      },
    });
    channel.emit("start", response.token.token);
    await recorder.start();
  };
  const handleStopClick = async () => {
    if (!recorder.isRecording()) return;
    recorder.stop();
    channel.emit("stop");
  };

  React.useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data);
      })
      .catch(() => {
        // Redirect to login page
        const searchParams = new URLSearchParams();
        searchParams.append("return_to", window.location.href);
        window.location.href = `${loginUrl}/login?${searchParams.toString()}`;
      });
  }, []);

  React.useEffect(() => {
    if (session === undefined) return;

    const channel = createWebrtcChannel("/stream");
    channel
      .onConnect(() => {
        recorder.onData(async (data) => channel.raw.emit(data));
      })
      .then();
    setChannel(channel);
  }, [session]);

  if (session === undefined) return null;

  return (
    <Layout title={title}>
      <input
        type="text"
        value={streamTitle}
        onChange={handleStreamTitleChange}
      />
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleStopClick}>Stop</button>
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      loginUrl: "/api/auth/ui",
    },
  };
}
