export default defineEventHandler(async (event) => {
  const { firstName, lastName, email } = await readBody(event);

  try {
    const res = await event.context.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        role: "Supervisor",
      },
    });

    setResponseStatus(event, 201);
    return { res };
  } catch (e) {
    setResponseStatus(event, 500);
    return { error: e };
  }
});
