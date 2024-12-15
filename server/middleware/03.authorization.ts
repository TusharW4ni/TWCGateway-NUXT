import { loginRedirectUrl } from "../api/auth0/redirect-urls";

export default defineEventHandler(async (event) => {
  const claims = event.context.claims;
  if (!claims) {
    sendRedirect(event, loginRedirectUrl());
  }
  try {
    const { email } = claims;
  } catch (e) {
    console.error("Error in authorization middleware: \n", e);
  }
});
