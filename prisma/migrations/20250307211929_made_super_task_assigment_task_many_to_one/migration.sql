/*
  Warnings:

  - You are about to drop the column `taskId` on the `supervisorTaskAssigment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_supervisorTaskAssigment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "supervisorTaskAssigment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_supervisorTaskAssigment" ("archived", "id", "userId") SELECT "archived", "id", "userId" FROM "supervisorTaskAssigment";
DROP TABLE "supervisorTaskAssigment";
ALTER TABLE "new_supervisorTaskAssigment" RENAME TO "supervisorTaskAssigment";
CREATE TABLE "new_task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "supervisorTaskAssignmentId" INTEGER,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "task_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "task_supervisorTaskAssignmentId_fkey" FOREIGN KEY ("supervisorTaskAssignmentId") REFERENCES "supervisorTaskAssigment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_task" ("archived", "departmentId", "description", "id") SELECT "archived", "departmentId", "description", "id" FROM "task";
DROP TABLE "task";
ALTER TABLE "new_task" RENAME TO "task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
