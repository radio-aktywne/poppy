import * as React from "react";
import { useState } from "react";
import Layout from "../components/layout";
import { createWebrtcChannel, post } from "../lib/api";
import { AudioRecorder } from "../lib/media";
import { ClientChannel } from "@geckos.io/client";

const title: string = "emiweb";
const recorder: AudioRecorder = new AudioRecorder();

export default function Index() {
  const [streamTitle, setStreamTitle] = useState<string>("");
  const [channel, setChannel] = useState<ClientChannel>(undefined);

  const handleStreamTitleChange = (event) => {
    setStreamTitle(event.target.value);
  };
  const handleStartClick = async () => {
    if (recorder.isRecording()) return;
    const response = await post("/stream/reserve", {
      reservation: {
        title: streamTitle || undefined
      }
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
    const channel = createWebrtcChannel("/stream");
    channel
      .onConnect(() => {
        recorder.onData(async (data) => channel.raw.emit(data));
      })
      .then();
    setChannel(channel);
  }, []);

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
