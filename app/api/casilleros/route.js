import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("sucursal");

  let where = {};
  if (slug) {
    const sucursal = await prisma.sucursal.findUnique({ where: { slug } });
    if (sucursal) where = { sucursalId: sucursal.id };
  }

  const casilleros = await prisma.casillero.findMany({
    where,
    orderBy: { numero: "asc" },
    include: { sucursal: true },
  });
  return Response.json(casilleros);
}
