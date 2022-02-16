import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const apiPath = "api";

const apiHost = process.env.EMIWEB_API_HOST || "localhost";
const apiPort = process.env.EMIWEB_API_PORT || "10000";

const apiWebsocketOptions = {
  target: `http://${apiHost}:${apiPort}`,
  ws: true,
  pathRewrite: {
    [`^/${apiPath}`]: "",
  },
  changeOrigin: true,
};

export default createProxyMiddleware(`/${apiPath}`, apiWebsocketOptions);
