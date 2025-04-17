export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const pageSize = parseInt(query.pageSize as string) || 10;
  const searchString = (query.searchString as string) || "";
  const skip = (page - 1) * pageSize;

  const lowerSearchString = searchString.toLowerCase();

  const searchCondition = searchString
    ? {
        OR: [{ description: { contains: lowerSearchString } }],
      }
    : {};

  const [tasks, total] = await Promise.all([
    event.context.prisma.task.findMany({
      where: {
        archived: false,
        ...searchCondition,
      },
      select: {
        id: true,
        description: true,
        Department: true,
        OnEmTaskAssignment: {
          select: {
            OnboardingEmployee: true,
          },
        },
        SupervisorTaskAssignment: {
          select: {
            Supervisor: true,
          },
        },
      },
      skip,
      take: pageSize,
      orderBy: {
        id: "desc",
      },
    }),
    event.context.prisma.task.count({
      where: {
        archived: false,
        ...searchCondition,
      },
    }),
  ]);

  return {
    tasks,
    total,
    page,
    pageSize,
  };
});
