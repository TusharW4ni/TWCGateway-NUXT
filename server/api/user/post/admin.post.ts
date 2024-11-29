export default defineEventHandler(async (event) => {
  const { firstName, lastName, email } = await readBody(event);
  try {
    await event.context.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        role: "Admin",
      },
    });
  } catch (error) {
    setResponseStatus(event, 400);
    return { error: error };
  }
  setResponseStatus(event, 201);
  return { message: "Admin created successfully" };
});
