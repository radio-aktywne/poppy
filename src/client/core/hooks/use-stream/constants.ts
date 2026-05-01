export const constants = {
  audio: {
    bitrate: 256000,
    channels: 2,
    codec: "opus",
    format: "ogg",
    samplerate: 48000,
  },

  webrtc: {
    ice: {
      candidates: {
        size: 1,
        timeout: 1000,
      },

      server: {
        host: "stun.l.google.com",
        port: 19302,
      },
    },

    latency: 200,
  },
} as const;
