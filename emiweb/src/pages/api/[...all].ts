import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const apiUrl = process.env.EMIWEB_EMIGATE_URL || "http://localhost:12000";

const apiOptions = {
  target: apiUrl,
  pathRewrite: {
    ["^/api"]: "",
  },
  changeOrigin: true,
};

export default createProxyMiddleware("/api", apiOptions);
