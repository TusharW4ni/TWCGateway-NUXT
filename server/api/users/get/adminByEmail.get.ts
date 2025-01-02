import { parseQuery } from "vue-router";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { email } = query || "";
  try {
    const user = await event.context.prisma.user.findUnique({
      where: {
        email,
      },
    });
    setResponseStatus(event, 200);
    return { user };
  } catch (e) {
    setResponseStatus(event, 500);
    return { errorMessage: "Error in adminByEmail", error: e };
  }
});
