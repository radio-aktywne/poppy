export const constants = {
  codec: "opus",
  format: "ogg",

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

  media: {
    audio: {
      constraints: {
        autoGainControl: false,
        channelCount: 2,
        echoCancellation: false,
        noiseSuppression: false,
        sampleRate: 48000,
        sampleSize: 16,
      },
    },
  },

  sdp: {
    codec: {
      maxaveragebitrate: "510000",
      ptime: "10",
    },
  },
} as const;
