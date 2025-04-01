import type { User } from "@prisma/client";

interface newOnEmRowData {
  firstName: string;
  lastName: string;
  email: string;
  departmentId: number;
}

interface fetchedUser {
  res: User;
}

export async function validateNewOnEm(rowData: newOnEmRowData) {
  const { firstName, lastName, email, departmentId } = rowData;
  console.log({ rowData });
  const errors = [];

  if (!firstName) {
    errors.push("First name is required");
  }
  if (!lastName) {
    errors.push("Last name is required");
  }
  if (!email) {
    errors.push("Email is required");
  }
  if (!departmentId) {
    errors.push("Department is required");
  }

  const { data } = await useFetch<fetchedUser>(`/api/users/get/${email}`);
  if (data.value?.res !== null) {
    errors.push("Email already exists");
  }

  return errors;
}
