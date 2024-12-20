export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const pageSize = parseInt(query.pageSize as string) || 3;
    const skip = (page - 1) * pageSize;

    const [admins, total] = await Promise.all([
      event.context.prisma.user.findMany({
        where: {
          role: "Admin",
          archived: false,
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
  } catch (e) {
    setResponseStatus(event, 500);
    return { error: e };
  }
});
