export default defineEventHandler(async (event) => {
  try {
    const res = await event.context.prisma.department.findMany({
      where: {
        archived: false,
      },
    });
    setResponseStatus(event, 200);
    return { res };
  } catch (e) {
    setResponseStatus(event, 500);
    console.log("Error fetching all departments", e);
    return { message: "Error fetching all departments", error: e };
  }
});
