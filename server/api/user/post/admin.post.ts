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
    setResponseStatus(event, 201);
    return { message: "Admin created successfully" };
  } catch (error) {
    setResponseStatus(event, 500);
    return { error: error };
  }
});
