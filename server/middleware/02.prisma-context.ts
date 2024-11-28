import { PrismaClient } from "@prisma/client";

const pClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  event.context.prisma = pClient;
});
