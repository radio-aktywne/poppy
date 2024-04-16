import "client-only";

import { useCallback, useRef } from "react";
import {
  createPassthrough,
  createWhipSession,
  deleteWhipSession,
  reserveStream,
} from "../../actions";
import { FormValues } from "../../components/StreamingWidget/IdleWidget";
import { Media } from "../../utils/media";
import { Peer } from "../../utils/webrtc";
import { UseStreamProps } from "./useStream.types";

export function useStream({ onError }: UseStreamProps = {}) {
  const mediaRef = useRef<Media>();
  const peerRef = useRef<Peer>();

  const start = useCallback(
    async (values: FormValues) => {
      const media = await Media.create();

      const createPeer = async () => {
        try {
          const reserveStreamResponse = await reserveStream({
            event: values.event,
            record: values.record,
          });

          if (reserveStreamResponse.error !== undefined)
            throw new Error(reserveStreamResponse.error);

          const createPassthroughResponse = await createPassthrough({
            password: reserveStreamResponse.data.credentials.token,
          });

          if (createPassthroughResponse.error !== undefined)
            throw new Error(createPassthroughResponse.error);

          const onPeerError = async () => {
            try {
              await deleteWhipSession();
            } catch {}

            await media.close();
            onError?.();
          };

          return await Peer.create({
            media: media,
            stun: createPassthroughResponse.data.stun,
            onError: onPeerError,
          });
        } catch (error) {
          await media.close();
          throw error;
        }
      };

      const peer = await createPeer();

      await new Promise((resolve) => setTimeout(resolve, 100));

      const getAnswer = async () => {
        try {
          const response = await createWhipSession({ offer: peer.offer });
          if (response.error !== undefined) throw new Error(response.error);
          return response.data;
        } catch (error) {
          await peer.close();
          await media.close();
          throw error;
        }
      };

      const answer = await getAnswer();
      await peer.handleAnswer(answer);

      mediaRef.current = media;
      peerRef.current = peer;
    },
    [onError],
  );

  const stop = useCallback(async () => {
    try {
      await deleteWhipSession();
    } catch {}

    await peerRef.current?.close();
    await mediaRef.current?.close();

    peerRef.current = undefined;
    mediaRef.current = undefined;
  }, []);

  return { start, stop };
}
