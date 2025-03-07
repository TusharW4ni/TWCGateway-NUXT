/*
  Warnings:

  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `taskAssignment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "location_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "location";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "taskAssignment";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "onEmTaskAssignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskId" INTEGER NOT NULL,
    "onboardingEmployeeId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedOn" DATETIME,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "onEmTaskAssignment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "onEmTaskAssignment_onboardingEmployeeId_fkey" FOREIGN KEY ("onboardingEmployeeId") REFERENCES "onboardingEmployee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "supervisorTaskAssigment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "supervisorTaskAssigment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supervisorTaskAssigment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "locationId" INTEGER,
    "archived" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_department" ("archived", "id", "locationId", "name") SELECT "archived", "id", "locationId", "name" FROM "department";
DROP TABLE "department";
ALTER TABLE "new_department" RENAME TO "department";
CREATE UNIQUE INDEX "department_name_key" ON "department"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
