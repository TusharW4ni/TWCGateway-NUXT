export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const pageSize = parseInt(query.pageSize as string) || 10;
    const searchString = (query.searchString as string) || "";
    const skip = (page - 1) * pageSize;

    const lowerSearchString = searchString.toLowerCase();
    console.log("lowerSearchString", lowerSearchString);

    const searchCondition = searchString
      ? {
          OR: [
            { firstName: { contains: lowerSearchString } },
            { lastName: { contains: lowerSearchString } },
            { email: { contains: lowerSearchString } },
            {
              OnboardingEmployee: {
                Department: {
                  name: { contains: lowerSearchString },
                },
              },
            },
          ],
        }
      : {};

    const [onboardingEmployees, total] = await Promise.all([
      event.context.prisma.user.findMany({
        where: {
          role: "Onboarding Employee",
          archived: false,
          ...searchCondition,
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
          role: "Onboarding Employee",
          archived: false,
          ...searchCondition,
        },
      }),
    ]);
    console.log("onboardingEmployees", onboardingEmployees);
    const transformedEmployees = onboardingEmployees.map((employee) => ({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.OnboardingEmployee?.Department?.name || null,
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
    console.error(e);
    setResponseStatus(event, 500);
    return { error: e.message };
  }
});
