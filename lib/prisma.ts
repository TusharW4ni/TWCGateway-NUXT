// // import { PrismaClient } from "../generated/prisma/client";
// // import { PrismaClient } from "@prisma/client";
// import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
// import { PrismaClient } from "../generated/client";

// const runtimeConfig = useRuntimeConfig();

// const adapter = new PrismaBetterSQLite3({ url: runtimeConfig.DATABASE_URL });
// const prisma = new PrismaClient({ adapter });

// // const prismaClientSingleton = () => {
// //   return new PrismaClient();
// // };

// // declare const globalThis: {
// //   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// // } & typeof global;

// // const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// export default prisma;

// // if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
