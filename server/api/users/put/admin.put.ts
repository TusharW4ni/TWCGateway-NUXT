export default defineEventHandler(async (event) => {
  const { id, email, firstName, lastName } = await readBody(event);
  try {
    const updatedUser = await event.context.prisma.user.update({
      where: { id },
      data: { email, firstName, lastName },
    });
    setResponseStatus(event, 201);
    return { body: updatedUser };
  } catch (e) {
    setResponseStatus(event, 500);
    return { error: e };
  }
});
