export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const pageSize = parseInt(query.pageSize as string) || 10;
    const searchString = (query.searchString as string) || "";

    const total = await event.context.prisma.user.count({
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
    });

    setResponseStatus(event, 200);
    return {
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (e) {
    setResponseStatus(event, 500);
    console.log("Error in admins-totalPages.get.ts", e);
    return { error: e };
  }
});
