export default defineEventHandler(async (event) => {
  const { name } = await readBody(event);
  try {
    const newDepartment = await event.context.prisma.department.create({
      data: {
        name,
      },
    });
    setResponseStatus(event, 201);
    return { message: "Department Created", department: newDepartment };
  } catch (error) {
    setResponseStatus(event, 500);
    console.log("Error creating department", error);
    return { message: "Error creating department", error: error };
  }
});
