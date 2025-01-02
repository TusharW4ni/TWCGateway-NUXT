export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const pageSize = parseInt(query.pageSize as string) || 10;
    const skip = (page - 1) * pageSize;

    const [onboardingEmployees, total] = await Promise.all([
      event.context.prisma.user.findMany({
        where: {
          role: "OnboardingEmployee",
          archived: false,
        },
        select: {
          firstName: true,
          lastName: true,
          email: true,
          OnboardingEmployee: {
            select: {
              Department: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: {
          id: "desc",
        },
      }),
      event.context.prisma.user.count({
        where: {
          role: "OnboardingEmployee",
          archived: false,
        },
      }),
    ]);

    // Flatten the result to include `departmentName`
    const transformedEmployees = onboardingEmployees.map((employee) => ({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      departmentName: employee.OnboardingEmployee?.Department?.name || null,
    }));

    setResponseStatus(event, 200);
    return {
      employees: transformedEmployees,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (e) {
    setResponseStatus(event, 500);
    return { error: e };
  }
});
