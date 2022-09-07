import { config, createApiHandler } from "@ory/integrations/next-edge";

const baseUrl = process.env.EMIWEB_EMIGATE_URL || "http://localhost:20000";
const apiUrl = `${baseUrl}/auth/authe`;

export { config };

export default createApiHandler({
  apiBaseUrlOverride: apiUrl,
  forceCookieDomain: process.env.EMIWEB_COOKIE_DOMAIN || "localhost",
});
