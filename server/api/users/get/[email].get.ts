export default defineEventHandler(async (event) => {
  const email = getRouterParam(event, "email");

  try {
    const res = event.context.prisma.user.findUnique({
      where: {
        archived: false,
        email,
      },
    });
    console.log({ res });
    setResponseStatus(event, 200);
    return { res };
  } catch (e) {
    console.log({ e });
    setResponseStatus(event, 500);
    return { error: e };
  }
});
