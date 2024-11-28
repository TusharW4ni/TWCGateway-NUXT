import jwt from "jsonwebtoken";
import fs from "fs";
import {
  loginRedirectUrl,
  logoutRedirectUrl,
} from "../api/auth0/redirect-urls";

export default defineEventHandler(async (event) => {
  // console.log("middleware 01.authentication.ts");
  // console.log("event.path", event.path);
  // console.log(" event.node.req.url", event.node.req.url);

  const token = getCookie(event, "token") || "";

  if (!token && !event.node.req.url?.includes("/api/login-callback")) {
    sendRedirect(event, loginRedirectUrl());
  } else {
    try {
      const claims = jwt.verify(
        token,
        fs.readFileSync(process.cwd() + "/cert-dev.pem")
      );
      event.context.claims = claims;
    } catch (e) {
      console.error(e);
    }
  }
});
