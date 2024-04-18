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
- `EMIWEB__EMISHOWS__HOST`
  host of the emishows service
  (default: `localhost`)
- `EMIWEB__EMISHOWS__PORT`
  port of the emishows service
  (default: `35000`)
- `EMIWEB__EMISTREAM__HTTP__HOST`
  host of the HTTP API of the emistream service
  (default: `localhost`)
- `EMIWEB__EMISTREAM__HTTP__PORT`
  port of the HTTP API of the emistream service
  (default: `10000`)
- `EMIWEB__EMISTREAM__SRT__HOST`
  host of the SRT stream of the emistream service
  (default: `localhost`)
- `EMIWEB__EMISTREAM__SRT__PORT`
  port of the SRT stream of the emistream service
  (default: `10000`)
- `EMIWEB__EMIPASS__HTTP__HOST`
  host of the HTTP API of the emipass service
  (default: `localhost`)
- `EMIWEB__EMIPASS__HTTP__PORT`
  port of the HTTP API of the emipass service
  (default: `11000`)
- `EMIWEB__EMIPASS__WHIP__HOST`
  host of the WHIP API of the emipass service
  (default: `localhost`)
- `EMIWEB__EMIPASS__WHIP__PORT`
  port of the WHIP API of the emipass service
  (default: `11001`)
