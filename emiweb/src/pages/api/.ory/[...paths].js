import { config, createApiHandler } from "@ory/integrations/next-edge";

const baseUrl = process.env.EMIWEB_AUTHGATE_URL || "http://localhost:20000";
const apiUrl = `${baseUrl}/authe`;

export { config };

export default createApiHandler({
  apiBaseUrlOverride: apiUrl,
});
