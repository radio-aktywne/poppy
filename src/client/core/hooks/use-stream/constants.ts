export const constants = {
  audio: {
    bitrate: 256000,
    channels: 2,
    codec: "opus",
    format: "ogg",
    samplerate: 48000,
  },

  webrtc: {
    connection: {
      timeout: 5000,
    },

    ice: {
      gathering: {
        delay: 1000,
        timeout: 5000,
      },

      pool: {
        size: 1,
      },

      server: {
        host: "stun.l.google.com",
        port: 19302,
      },
    },

    latency: 200,
  },
} as const;
