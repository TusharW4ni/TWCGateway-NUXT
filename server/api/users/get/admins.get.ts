export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const pageSize = parseInt(query.pageSize as string) || 10;
    const searchString = (query.searchString as string) || "";
    console.log({ searchString });
    const skip = (page - 1) * pageSize;

    const [admins, total] = await Promise.all([
      event.context.prisma.user.findMany({
        where: {
          role: "Admin",
          archived: false,
          OR: [
            {
              firstName: {
                contains: searchString,
              },
            },
            {
              lastName: {
                contains: searchString,
              },
            },
            {
              email: {
                contains: searchString,
              },
            },
          ],
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
