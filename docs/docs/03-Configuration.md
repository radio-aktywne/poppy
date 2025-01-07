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
- `POPPY__SECRETS__AUTH` -
  secrets for encrypting auth cookies
  (default: `secret`)
- `POPPY__URLS__PUBLIC` -
  public URL of the app
  (default: `http://localhost:10410`)
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
- `POPPY__SCORPION__PUBLIC__SCHEME` -
  scheme of the public API of the scorpion service
  (default: `http`)
- `POPPY__SCORPION__PUBLIC__HOST` -
  host of the public API of the scorpion service
  (default: `localhost`)
- `POPPY__SCORPION__PUBLIC__PORT` -
  port of the public API of the scorpion service
  (default: `20000`)
- `POPPY__SCORPION__PUBLIC__PATH` -
  path of the public API of the scorpion service
  (default: ``)
- `POPPY__SCORPION__PUBLIC__CLIENT` -
  client ID to authenticate with the public API of the scorpion service
  (default: `poppy`)
- `POPPY__SCORPION__PUBLIC__SECRET` -
  client secret to authenticate with the public API of the scorpion service
  (default: `secret`)
- `POPPY__DEBUG` -
  enable debug mode
  (default: `true`)
