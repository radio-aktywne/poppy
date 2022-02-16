<h1 align="center">emiweb</h1>

<div align="center">

Emission web UI 🎤

[![Testing docker build](https://github.com/radio-aktywne/emiweb/actions/workflows/docker-build.yml/badge.svg)](https://github.com/radio-aktywne/emiweb/actions/workflows/docker-build.yml)
[![Deploying docs](https://github.com/radio-aktywne/emiweb/actions/workflows/docs.yml/badge.svg)](https://github.com/radio-aktywne/emiweb/actions/workflows/docs.yml)

</div>

---

`emiweb` is a web UI that you can use to transmit your voice over WebSockets.

## Usage

To start the server make sure you have [`npm`](https://www.npmjs.com)
and [`next.js`](https://nextjs.org) installed, then run:

```sh
npm run start
```

Then you can visit [`http://localhost:11000`](http://localhost:11000) by default
in your browser and start streaming.

## Output

`emiweb` sends the output using WebSockets to the listener. You need to provide
some info about it using environmental variables:

- `EMIWEB_API_HOST` - address of the host where the target server is running
- `EMIWEB_API_PORT` - port at which the target server is listening
