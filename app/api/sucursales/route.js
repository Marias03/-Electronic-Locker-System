import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const sucursales = await prisma.sucursal.findMany({
    where: { activa: true },
    orderBy: { nombre: "asc" },
  });
  return Response.json(sucursales);
}

export async function POST(request) {
  const { nombre, tipo, ciudad, direccion, lat, lng, slug } =
    await request.json();
  const sucursal = await prisma.sucursal.create({
    data: { nombre, tipo, ciudad, direccion, lat, lng, slug },
  });
  return Response.json(sucursal);
}
