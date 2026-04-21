import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const startTime = Date.now();

export async function GET() {
  let dbStatus = "ok";

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    dbStatus = "error";
  }

  const uptime = Math.floor((Date.now() - startTime) / 1000);

  return Response.json({
    status: "ok",
    version: "1.0.0",
    uptime: `${uptime}s`,
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
}
