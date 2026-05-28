javascript;
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const pagos = await prisma.pago.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return Response.json(pagos);
}

export async function POST(request) {
  const { numero, tamanio, usuario, email, monto } = await request.json();
  const pago = await prisma.pago.create({
    data: { numero, tamanio, usuario, email, monto },
  });
  return Response.json(pago);
}
