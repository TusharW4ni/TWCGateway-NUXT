import {
  loginRedirectUrl,
  logoutRedirectUrl,
} from "../api/auth0/redirect-urls";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token") || "";
  // ---- ▼ Comment out these lines to test APIs ▼ ---- //
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
    // console.log("Users from authorization middleware: \n", user);
    setCookie(event, "currentUser", JSON.stringify(user), {
      maxAge: 60 * 60 * 24 * 5,
    });
    if (!user) {
      sendRedirect(event, logoutRedirectUrl(token));
    } else {
      event.context.user = user;
    }
  } catch (e) {
    console.error("Error in authorization middleware: \n", e);
  }
  // ---- ▲ Comment out these lines to test APIs ▲ ---- //
});
