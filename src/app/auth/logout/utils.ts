import { auth } from "../../../auth";

export async function createLogoutParams() {
  const session = await auth.auth();

  const params = new URLSearchParams({
    post_logout_redirect_uri:
      process.env.POPPY__URLS__PUBLIC || "http://localhost:10410",
  });

  if (session) {
    params.append("id_token_hint", session.custom.tokens.id.token);
  }

  return params;
}
