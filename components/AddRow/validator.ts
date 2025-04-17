import type { User } from "@prisma/client";

interface newOnEmRowData {
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
}

interface fetchedUser {
  res: User;
}

interface newAdminRowData {
  firstName: string;
  lastName: string;
  email: string;
}

export async function validateNewOnEm(rowData: newOnEmRowData) {
  const { firstName, lastName, email, departmentId } = rowData;
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

export async function validateNewSupervisor(rowData: newAdminRowData) {
  const { firstName, lastName, email } = rowData;
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

  return errors;
}

export async function validateNewAdmin(rowData: newAdminRowData) {
  const { firstName, lastName, email } = rowData;
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

  return errors;
}
