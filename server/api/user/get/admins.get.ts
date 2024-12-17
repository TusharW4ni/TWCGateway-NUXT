export default defineEventHandler(async (event) => {
  try {
    const admins = await event.context.prisma.user.findMany({
      where: {
        role: "Admin",
        archived: false,
      },
    });
    setResponseStatus(event, 200);
    return admins;
  } catch (e) {
    setResponseStatus(event, 500);
    return { error: e };
  }
});
