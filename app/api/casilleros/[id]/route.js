import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generarPIN() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const { ocupado, usuario, pin, forzar } = await request.json();

  if (!ocupado && !forzar) {
    const casillero = await prisma.casillero.findUnique({
      where: { id: parseInt(id) },
    });
    if (casillero.pin && casillero.pin !== pin) {
      return Response.json({ error: "Incorrect PIN" }, { status: 401 });
    }
  }

  const casillero = await prisma.casillero.update({
    where: { id: parseInt(id) },
    data: {
      ocupado,
      usuario: ocupado ? usuario : null,
      pin: ocupado ? generarPIN() : null,
    },
  });

  return Response.json(casillero);
}
