import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const hace48h = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const historial = await prisma.historial.findMany({
    where: {
      createdAt: { gte: hace48h },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return Response.json(historial);
}
