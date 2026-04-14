import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  const { id } = await params;
  const { ocupado, usuario } = await request.json();

  const casillero = await prisma.casillero.update({
    where: { id: parseInt(id) },
    data: {
      ocupado,
      usuario: ocupado ? usuario : null,
    },
  });

  return Response.json(casillero);
}
