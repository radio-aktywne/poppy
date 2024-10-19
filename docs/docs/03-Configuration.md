---
slug: /config
title: Configuration
---

## Environment variables

You can configure the app at runtime using various environment variables:

- `POPPY__SERVER__HOST` -
  host to run the server on
  (default: `0.0.0.0`)
- `POPPY__SERVER__PORT` -
  port to run the server on
  (default: `10410`)
- `POPPY__EVENTS__WINDOW` -
  time window to search for event instances around the current time
  (default: `PT1H`)
- `POPPY__BEAVER__HTTP__SCHEME`
  scheme of the HTTP API of the beaver service
  (default: `http`)
- `POPPY__BEAVER__HTTP__HOST`
  host of the HTTP API of the beaver service
  (default: `localhost`)
- `POPPY__BEAVER__HTTP__PORT`
  port of the HTTP API of the beaver service
  (default: `10500`)
- `POPPY__BEAVER__HTTP__PATH`
  path of the HTTP API of the beaver service
  (default: ``)
- `POPPY__LORIS__HTTP__SCHEME`
  scheme of the HTTP API of the loris service
  (default: `http`)
- `POPPY__LORIS__HTTP__HOST`
  host of the HTTP API of the loris service
  (default: `localhost`)
- `POPPY__LORIS__HTTP__PORT`
  port of the HTTP API of the loris service
  (default: `10400`)
- `POPPY__LORIS__HTTP__PATH`
  path of the HTTP API of the loris service
  (default: ``)
- `POPPY__LORIS__WHIP__SCHEME`
  scheme of the WHIP API of the loris service
  (default: `http`)
- `POPPY__LORIS__WHIP__HOST`
  host of the WHIP API of the loris service
  (default: `localhost`)
- `POPPY__LORIS__WHIP__PORT`
  port of the WHIP API of the loris service
  (default: `10401`)
- `POPPY__LORIS__WHIP__PATH`
  path of the WHIP API of the loris service
  (default: ``)
- `POPPY__OCTOPUS__HTTP__SCHEME`
  scheme of the HTTP API of the octopus service
  (default: `http`)
- `POPPY__OCTOPUS__HTTP__HOST`
  host of the HTTP API of the octopus service
  (default: `localhost`)
- `POPPY__OCTOPUS__HTTP__PORT`
  port of the HTTP API of the octopus service
  (default: `10300`)
- `POPPY__OCTOPUS__HTTP__PATH`
  path of the HTTP API of the octopus service
  (default: ``)
- `POPPY__OCTOPUS__SRT__HOST`
  host of the SRT stream of the octopus service
  (default: `localhost`)
- `POPPY__OCTOPUS__SRT__PORT`
  port of the SRT stream of the octopus service
  (default: `10300`)
