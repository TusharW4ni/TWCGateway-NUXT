export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const pageSize = parseInt(query.pageSize as string) || 10;
    const searchString = (query.searchString as string) || "";
    const skip = (page - 1) * pageSize;

    const lowerCaseSearchString = searchString.toLowerCase();

    const searchConditions = searchString
      ? {
          OR: [
            { firstName: { contains: lowerCaseSearchString } },
            { lastName: { contains: lowerCaseSearchString } },
            { email: { contains: lowerCaseSearchString } },
          ],
        }
      : {};

    const supervisors = await event.context.prisma.user.findMany({
      where: {
        archived: false,
        role: "Supervisor",
        ...searchConditions,
      },
      skip,
      take: pageSize,
      orderBy: {
        id: "desc",
      },
    });

    const total = await event.context.prisma.user.count({
      where: {
        archived: false,
        role: "Supervisor",
        ...searchConditions,
      },
    });

    setResponseStatus(event, 200);
    return {
      supervisors,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (e: any) {
    console.error(e);
    setResponseStatus(event, 500);
    return { error: e.message };
  }
});
