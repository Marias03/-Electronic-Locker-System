import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const historial = await prisma.historial.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return Response.json(historial);
}
