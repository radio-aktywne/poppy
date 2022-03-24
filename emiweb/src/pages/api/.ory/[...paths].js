import { config, createApiHandler } from "@ory/integrations/next-edge";

const apiUrl = process.env.EMIWEB_WEBAUTH_URL || "http://localhost:23000";

export { config };

export default createApiHandler({
  apiBaseUrlOverride: `${apiUrl}/api/.ory`,
});
