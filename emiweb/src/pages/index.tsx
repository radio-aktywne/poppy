import * as React from "react";
import Layout from "../components/layout";
import { geckos } from "@geckos.io/client";

const title = "emiweb";

export default function Index({}) {
  const handleClick = () => {
    console.log("onclick");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(async (stream) => {
        const url = `${location.origin}/api`;
        const channel = geckos({ url: url, port: null });

        await channel.onConnect((error) => {
          if (error) {
            console.error(error.message);
            return;
          }

          const mediaRecorder = new MediaRecorder(stream);

          mediaRecorder.addEventListener("dataavailable", async (e) => {
            const data = await e.data.arrayBuffer();
            channel.raw.emit(data);
          });

          mediaRecorder.start(1000);
        });
      });
  };

  return (
    <Layout title={title}>
      <button onClick={handleClick}>Go Live</button>
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
