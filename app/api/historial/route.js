import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("sucursal");
  const hace48h = new Date(Date.now() - 48 * 60 * 60 * 1000);

  let where = { createdAt: { gte: hace48h } };
  if (slug) {
    const sucursal = await prisma.sucursal.findUnique({ where: { slug } });
    if (sucursal) where = { ...where, sucursalId: sucursal.id };
  }

  const historial = await prisma.historial.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return Response.json(historial);
}
