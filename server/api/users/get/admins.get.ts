export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const pageSize = parseInt(query.pageSize as string) || 10;
    const searchString = (query.searchString as string) || "";
    const skip = (page - 1) * pageSize;

    const lowerSearchString = searchString.toLowerCase();

    const searchCondition = searchString
      ? {
          OR: [
            { firstName: { contains: lowerSearchString } },
            { lastName: { contains: lowerSearchString } },
            { email: { contains: lowerSearchString } },
          ],
        }
      : {};

    const [admins, total] = await Promise.all([
      event.context.prisma.user.findMany({
        where: {
          role: "Admin",
          archived: false,
          ...searchCondition,
        },
        skip,
        take: pageSize,
        orderBy: {
          id: "desc",
        },
      }),
      event.context.prisma.user.count({
        where: {
          role: "Admin",
          archived: false,
          ...searchCondition,
        },
      }),
    ]);
    setResponseStatus(event, 200);
    return {
      admins,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (e: any) {
    console.error(e);
    setResponseStatus(event, 500);
    return {
      error: "e.message",
    };
  }
});
