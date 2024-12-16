import {
  loginRedirectUrl,
  logoutRedirectUrl,
} from "../api/auth0/redirect-urls";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token") || "";
  const claims = event.context.claims;
  if (!claims) {
    sendRedirect(event, loginRedirectUrl());
  }
  try {
    const { email } = claims;
    const user = await event.context.prisma.user.findUnique({
      where: {
        email,
        archived: false,
      },
    });
    console.log("Users from authorization middleware: \n", user);
    if (!user) {
      sendRedirect(event, logoutRedirectUrl(token));
    } else {
      event.context.user = user;
    }
  } catch (e) {
    console.error("Error in authorization middleware: \n", e);
  }
});
