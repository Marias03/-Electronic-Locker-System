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

  const pagos = await prisma.pago.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { sucursal: true },
  });
  return Response.json(pagos);
}

export async function POST(request) {
  const { numero, tamanio, usuario, email, monto, sucursalId } =
    await request.json();
  const pago = await prisma.pago.create({
    data: { numero, tamanio, usuario, email, monto, sucursalId },
    include: { sucursal: true },
  });
  return Response.json(pago);
}
