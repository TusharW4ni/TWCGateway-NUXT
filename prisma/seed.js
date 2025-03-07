import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Admin
  await prisma.user.create({
    data: {
      firstName: "admin",
      lastName: "user",
      email: "admin@test.com",
      role: "Admin",
    },
  });

  // Departments
  const departmentsData = Array.from({ length: 10 }, (_, i) => ({
    name: `Department${i + 1}`,
  }));

  await prisma.department.createMany({
    data: departmentsData,
  });

  // Tasks
  const tasksData = Array.from({ length: 10 }, (_, i) => ({
    description: `Long description of task ${
      i + 1
    }. It is a very long description of task ${
      i + 1
    }. It just talks about how long the description of task ${
      i + 1
    } is. It keeps going on about how long the description of task ${
      i + 1
    } is.`,
    departmentId: 1,
  }));

  await prisma.task.createMany({
    data: tasksData,
  });

  // Employees
  const employees = Array.from({ length: 10 }, (_, i) => ({
    firstName: `ON${i + 1}`,
    lastName: `EM${i + 1}`,
    email: `onem${i + 1}@onems.com`,
    role: "Onboarding Employee",
  }));

  await prisma.user.createMany({
    data: employees,
  });

  // Onboarding Employees
  const employeeUsers = await prisma.user.findMany({
    where: {
      role: "Onboarding Employee",
    },
    select: {
      id: true,
    },
  });

  const onboardingEmployees = employeeUsers.map((user) => ({
    userId: user.id,
    departmentId: 1,
  }));

  await prisma.onboardingEmployee.createMany({
    data: onboardingEmployees,
  });

  // Onboarding Task Assignments
  const onboardingEmployeeRecords = await prisma.onboardingEmployee.findMany({
    select: {
      id: true,
    },
  });

  const onEmTaskAssignments = onboardingEmployeeRecords.flatMap((onEm) =>
    Array.from({ length: 10 }, (_, i) => ({
      taskId: i + 1, // Assuming taskId 1 to 10 exists
      onboardingEmployeeId: onEm.id,
    }))
  );

  await prisma.onEmTaskAssignment.createMany({
    data: onEmTaskAssignments,
  });

  // Supervisors
  const supervisors = Array.from({ length: 10 }, (_, i) => ({
    firstName: `SUPER${i + 1}`,
    lastName: `VISOR${i + 1}`,
    email: `super${i + 1}@visor.com`,
    role: "Supervisor",
  }));

  await prisma.user.createMany({
    data: supervisors,
  });

  // Supervisor Task Assignments
  const supervisorUsers = await prisma.user.findMany({
    where: {
      role: "Supervisor",
    },
    select: {
      id: true,
    },
  });

  const supervisorTaskAssignmentsData = supervisorUsers.map(
    (supervisor, index) => ({
      userId: supervisor.id,
    })
  );

  await prisma.supervisorTaskAssignment.createMany({
    data: supervisorTaskAssignmentsData,
  });

  const supervisorTaskAssignments =
    await prisma.supervisorTaskAssignment.findMany();

  for (let i = 0; i < supervisorTaskAssignments.length; i++) {
    await prisma.task.update({
      where: {
        id: i + 1,
      },
      data: {
        supervisorTaskAssignmentId: supervisorTaskAssignments[i].id,
      },
    });
  }
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
