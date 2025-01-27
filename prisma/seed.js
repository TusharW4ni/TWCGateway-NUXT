import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // admins
  await prisma.user.createMany({
    data: [
      {
        firstName: "Tushar",
        lastName: "Wani",
        email: "reachtusharwani@gmail.com",
        role: "Admin",
      },
      {
        firstName: "adm",
        lastName: "in1",
        email: "admin1@admins.com",
        role: "Admin",
      },
      {
        firstName: "adm",
        lastName: "in2",
        email: "admin2@admins.com",
        role: "Admin",
      },
    ],
  });

  // departments
  await prisma.department.createMany({
    data: [
      {
        name: "Department1",
      },
      {
        name: "Department2",
      },
      {
        name: "Department3",
      },
      {
        name: "Department4",
      },
      {
        name: "Department5",
      },
      {
        name: "Department6",
      },
      {
        name: "Department7",
      },
      {
        name: "Department8",
      },
      {
        name: "Department9",
      },
      {
        name: "Department10",
      },
    ],
  });

  // tasks
  await prisma.task.createMany({
    data: [
      {
        description:
          "Long description of task 1. It is a very long description of task 1. It just talks about how long the description of task 1 is. It keeps going on about how long the description of task 1 is.",
        departmentId: 1,
      },
      {
        description:
          "Long description of task 2. It is a very long description of task 2. It just talks about how long the description of task 2 is. It keeps going on about how long the description of task 2 is.",
        departmentId: 1,
      },
      {
        description:
          "Long description of task 3. It is a very long description of task 3. It just talks about how long the description of task 3 is. It keeps going on about how long the description of task 3 is.",
        departmentId: 1,
      },
      {
        description:
          "Long description of task 4. It is a very long description of task 4. It just talks about how long the description of task 4 is. It keeps going on about how long the description of task 4 is.",
        departmentId: 1,
      },
      {
        description:
          "Long description of task 5. It is a very long description of task 5. It just talks about how long the description of task 5 is. It keeps going on about how long the description of task 5 is.",
        departmentId: 1,
      },
      {
        description:
          "Long description of task 6. It is a very long description of task 6. It just talks about how long the description of task 6 is. It keeps going on about how long the description of task 6 is.",
        departmentId: 1,
      },
      {
        description:
          "Long description of task 7. It is a very long description of task 7. It just talks about how long the description of task 7 is. It keeps going on about how long the description of task 7 is.",
        departmentId: 1,
      },
      {
        description:
          "Long description of task 8. It is a very long description of task 8. It just talks about how long the description of task 8 is. It keeps going on about how long the description of task 8 is.",
        departmentId: 1,
      },
      {
        description:
          "Long description of task 9. It is a very long description of task 9. It just talks about how long the description of task 9 is. It keeps going on about how long the description of task 9 is.",
        departmentId: 1,
      },
      {
        description:
          "Long description of task 10. It is a very long description of task 10. It just talks about how long the description of task 10 is. It keeps going on about how long the description of task 10 is.",
        departmentId: 1,
      },
    ],
  });

  // onboarding employee and department assignment
  const employees = Array.from({ length: 10 }, (_, i) => ({
    firstName: `ON${i + 1}`,
    lastName: `EM${i + 1}`,
    email: `onem${i + 1}@onems.com`,
    role: "Onboarding Employee",
  }));

  const createdUsers = await prisma.user.createMany({
    data: employees,
  });

  const userIds = await prisma.user.findMany({
    where: {
      email: {
        in: employees.map((e) => e.email),
      },
    },
    select: {
      id: true,
    },
  });

  const onboardingEmployees = userIds.map((user, i) => ({
    userId: user.id,
    departmentId: 1,
  }));

  const createdOnboardingEmployees = await prisma.onboardingEmployee.createMany(
    {
      data: onboardingEmployees,
    }
  );

  const onboardingEmployeeIds = await prisma.onboardingEmployee.findMany({
    where: {
      userId: {
        in: userIds.map((u) => u.id),
      },
    },
    select: {
      id: true,
    },
  });

  const taskAssignments = onboardingEmployeeIds.flatMap((onEm) =>
    Array.from({ length: 10 }, (_, i) => ({
      taskId: i + 1,
      onboardingEmployeeId: onEm.id,
    }))
  );

  await prisma.taskAssignment.createMany({
    data: taskAssignments,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
