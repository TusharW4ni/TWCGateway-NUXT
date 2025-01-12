import jwt from "jsonwebtoken";
import fs from "fs";
import {
  loginRedirectUrl,
  logoutRedirectUrl,
} from "../api/auth0/redirect-urls";

export default defineEventHandler(async (event) => {
  // console.log("this is being hit");
  const token = getCookie(event, "token") || "";
  // ---- ▼ Comment out these lines to test APIs ▼ ---- //
  if (!token && !event.node.req.url?.includes("/api/login-callback")) {
    // console.log("user is not logged in");
    sendRedirect(event, loginRedirectUrl());
  } else {
    // console.log("user is logged in");
    try {
      try {
        const claims = jwt.verify(
          token,
          fs.readFileSync(process.cwd() + "/cert-dev.pem")
        );
        // console.log("Claims from the JWT Token: \n", claims);
        event.context.claims = claims;
        // console.log("event.context", event.context);
      } catch (e) {
        console.error(e);
        sendRedirect(event, logoutRedirectUrl(token));
      }
    } catch (e) {
      console.error(e);
    }
  }
  // ---- ▲ Comment out these lines to test APIs ▲ ---- //
});
