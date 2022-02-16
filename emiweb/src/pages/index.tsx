import * as React from "react";
import Layout from "../components/layout";

const title = "emiweb";

export default function Index({}) {
  const handleClick = () => {
    console.log("onclick");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(async (stream) => {
        console.log("onstream");
        await fetch("/api/stream");
        const ws = new WebSocket("ws://" + location.host + "/api/stream");
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.addEventListener("dataavailable", (e) => {
          console.log("ondataavailable");
          ws.send(e.data);
        });
        mediaRecorder.start(1000);
      });
  };

  return (
    <Layout title={title}>
      <button onClick={handleClick}>xD</button>
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
