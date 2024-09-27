import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-unused-vars, no-var
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma


/**
Tambem pode ser feito dessa maneira, é apenas para não ficar chamando o prisma direto, so acontece no next js

import { PrismaClient } from "@prisma/client";

declare global {
var prisma: PrismaClient | undefined;

export const db = global.prisma | | new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = db;
 */