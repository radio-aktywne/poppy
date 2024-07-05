---
slug: /config
title: Configuration
---

## Environment variables

You can configure the app at runtime using various environment variables:

- `WEBSTREAM__SERVER__HOST` -
  host to run the server on
  (default: `0.0.0.0`)
- `WEBSTREAM__SERVER__PORT` -
  port to run the server on
  (default: `13000`)
- `WEBSTREAM__EVENTS__WINDOW` -
  time window to search for event instances around the current time
  (default: `PT1H`)
- `WEBSTREAM__EMISHOWS__HTTP__SCHEME`
  scheme of the HTTP API of the emishows service
  (default: `http`)
- `WEBSTREAM__EMISHOWS__HTTP__HOST`
  host of the HTTP API of the emishows service
  (default: `localhost`)
- `WEBSTREAM__EMISHOWS__HTTP__PORT`
  port of the HTTP API of the emishows service
  (default: `35000`)
- `WEBSTREAM__EMISHOWS__HTTP__PATH`
  path of the HTTP API of the emishows service
  (default: ``)
- `WEBSTREAM__EMISTREAM__HTTP__SCHEME`
  scheme of the HTTP API of the emistream service
  (default: `http`)
- `WEBSTREAM__EMISTREAM__HTTP__HOST`
  host of the HTTP API of the emistream service
  (default: `localhost`)
- `WEBSTREAM__EMISTREAM__HTTP__PORT`
  port of the HTTP API of the emistream service
  (default: `10000`)
- `WEBSTREAM__EMISTREAM__HTTP__PATH`
  path of the HTTP API of the emistream service
  (default: ``)
- `WEBSTREAM__EMISTREAM__SRT__HOST`
  host of the SRT stream of the emistream service
  (default: `localhost`)
- `WEBSTREAM__EMISTREAM__SRT__PORT`
  port of the SRT stream of the emistream service
  (default: `10000`)
- `WEBSTREAM__EMIPASS__HTTP__SCHEME`
  scheme of the HTTP API of the emipass service
  (default: `http`)
- `WEBSTREAM__EMIPASS__HTTP__HOST`
  host of the HTTP API of the emipass service
  (default: `localhost`)
- `WEBSTREAM__EMIPASS__HTTP__PORT`
  port of the HTTP API of the emipass service
  (default: `11000`)
- `WEBSTREAM__EMIPASS__HTTP__PATH`
  path of the HTTP API of the emipass service
  (default: ``)
- `WEBSTREAM__EMIPASS__WHIP__SCHEME`
  scheme of the WHIP API of the emipass service
  (default: `http`)
- `WEBSTREAM__EMIPASS__WHIP__HOST`
  host of the WHIP API of the emipass service
  (default: `localhost`)
- `WEBSTREAM__EMIPASS__WHIP__PORT`
  port of the WHIP API of the emipass service
  (default: `11001`)
- `WEBSTREAM__EMIPASS__WHIP__PATH`
  path of the WHIP API of the emipass service
  (default: ``)
