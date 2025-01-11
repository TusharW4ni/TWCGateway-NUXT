export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id } = body;
  try {
    await event.context.prisma.user.delete({
      where: {
        id,
      },
    });

    setResponseStatus(event, 200);
    return { message: "user deleted successfully" };
  } catch (e) {
    console.log(e);
    setResponseStatus(event, 500);
    return { error: "error in deleting admin" };
  }
});
