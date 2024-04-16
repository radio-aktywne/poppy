---
slug: /config
title: Configuration
---

## Environment variables

You can configure the app at runtime using various environment variables:

- `EMIWEB__SERVER__HOST` -
  host to run the server on
  (default: `0.0.0.0`)
- `EMIWEB__SERVER__PORT` -
  port to run the server on
  (default: `13000`)
- `EMIWEB__EVENTS__WINDOW` -
  time window to search for event instances around the current time
  (default: `PT1H`)
- `EMIWEB__EMISHOWS__HTTP__URL`
  URL to the emishows HTTP api
  (default: `http://localhost:35000`)
- `EMIWEB__EMISTREAM__HTTP__URL`
  URL to the emistream HTTP api
  (default: `http://localhost:10000`)
- `EMIWEB__EMISTREAM__SRT__HOST`
  host to use for SRT streaming to the emistream service
  (default: `localhost`)
- `EMIWEB__EMISTREAM__SRT__PORT`
  port to use for SRT streaming to the emistream service
  (default: `10000`)
- `EMIWEB__EMIPASS__HTTP__URL`
  URL to the emipass HTTP api
  (default: `http://localhost:11000`)
- `EMIWEB__EMIPASS__WHIP__URL`
  URL to the emipass WHIP api
  (default: `http://localhost:11001`)
