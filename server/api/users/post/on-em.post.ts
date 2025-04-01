export default defineEventHandler(async (event) => {
  const { firstName, lastName, email, departmentId } = await readBody(event);

  try {
    const res = await event.context.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        role: "Onboarding Employee",
        OnboardingEmployee: {
          create: {
            departmentId: Number(departmentId),
          },
        },
      },
      include: {
        OnboardingEmployee: true,
      },
    });

    setResponseStatus(event, 201);
    return { res };
  } catch (e) {
    setResponseStatus(event, 500);
    return { error: e };
  }
});
