import { logoutRedirectUrl } from "./redirect-urls";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  setCookie(event, "token", body.id_token);
  if (event.context.user.role === "Admin") {
    await sendRedirect(event, "/admin/users");
  } else if (event.context.user.role === "Supervisor") {
    await sendRedirect(event, `/supervisor/${event.context.user.id}`);
  } else if (event.context.user.role === "Onboarding Employee") {
    await sendRedirect(event, `/onboarding-employee/${event.context.user.id}`);
  } else {
    await sendRedirect(event, logoutRedirectUrl(body.id_token));
  }
});
