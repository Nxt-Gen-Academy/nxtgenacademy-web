import { PrismaClient } from "./generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient;

if (typeof window === "undefined") {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    stream: () => {
      const net = require("net");
      const socket = new net.Socket();
      const originalConnect = socket.connect;
      socket.connect = function (options: any, cb?: any) {
        if (typeof options === "object") {
          options.autoSelectFamily = false;
          return originalConnect.call(this, options, cb);
        } else {
          return originalConnect.call(this, {
            port: options,
            host: cb,
            autoSelectFamily: false,
          });
        }
      };
      return socket;
    },
  });
  const adapter = new PrismaPg(pool);
  prismaInstance = globalForPrisma.prisma || new PrismaClient({ adapter });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaInstance;
} else {
  prismaInstance = null as any;
}

export const prisma = prismaInstance;
export { PrismaClient };
