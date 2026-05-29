import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const sucursales = await prisma.sucursal.findMany({
    where: { activa: true },
    orderBy: { createdAt: "asc" },
  });
  return Response.json(sucursales);
}

export async function POST(request) {
  const {
    nombre,
    tipo,
    ciudad,
    direccion,
    lat,
    lng,
    slug,
    pequeños,
    medianos,
    grandes,
  } = await request.json();

  try {
    const count = await prisma.sucursal.count();
    const sector = String.fromCharCode(65 + count);

    const sucursal = await prisma.sucursal.create({
      data: { nombre, tipo, ciudad, direccion, lat, lng, slug, sector },
    });

    const casilleros = [];
    let numero = 1;

    for (let i = 0; i < (pequeños || 0); i++) {
      casilleros.push({
        numero: numero++,
        tamanio: "pequeño",
        sucursalId: sucursal.id,
      });
    }
    for (let i = 0; i < (medianos || 0); i++) {
      casilleros.push({
        numero: numero++,
        tamanio: "mediano",
        sucursalId: sucursal.id,
      });
    }
    for (let i = 0; i < (grandes || 0); i++) {
      casilleros.push({
        numero: numero++,
        tamanio: "grande",
        sucursalId: sucursal.id,
      });
    }

    await prisma.casillero.createMany({ data: casilleros });
    return Response.json(sucursal);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  const { id } = await request.json();
  try {
    await prisma.casillero.deleteMany({ where: { sucursalId: id } });
    await prisma.sucursal.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}
