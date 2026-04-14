import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const casilleros = await prisma.casillero.findMany({
    orderBy: { numero: "asc" },
  });
  return Response.json(casilleros);
}
