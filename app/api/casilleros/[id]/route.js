import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import logger from "@/app/lib/logger.mjs";
import { rateLimit } from "@/app/lib/ratelimit.js";

const prisma = new PrismaClient();

function generarPIN() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function PUT(request, { params }) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  const { allowed } = rateLimit(ip);

  if (!allowed) {
    logger.warn("Rate limit exceeded", { ip });
    return Response.json(
      { error: "Too many requests. Please wait a minute." },
      { status: 429 },
    );
  }

  const { id } = await params;
  const { ocupado, usuario, email, pin, forzar } = await request.json();

  logger.info("Locker action", {
    id,
    occupied: ocupado,
    user: usuario,
    email: email || null,
  });

  if (ocupado && email) {
    const casillerosPorEmail = await prisma.casillero.count({
      where: { email, ocupado: true },
    });
    if (casillerosPorEmail >= 2) {
      logger.warn("Max lockers per email reached", { email });
      return Response.json(
        { error: "This email already has 2 reserved lockers" },
        { status: 400 },
      );
    }
  }

  if (!ocupado && !forzar) {
    const casillero = await prisma.casillero.findUnique({
      where: { id: parseInt(id) },
    });
    if (casillero.pin && casillero.pin !== pin) {
      logger.warn("Incorrect PIN attempt", { id, user: usuario });
      return Response.json({ error: "Incorrect PIN" }, { status: 401 });
    }
  }

  const nuevoPIN = ocupado ? generarPIN() : null;

  let casillero;

  if (ocupado) {
    // Solo actualiza si AÚN está libre
    const resultado = await prisma.casillero.updateMany({
      where: { id: parseInt(id), ocupado: false },
      data: {
        ocupado: true,
        usuario,
        email,
        pin: nuevoPIN,
      },
    });

    if (resultado.count === 0) {
      logger.warn("Locker already taken (race condition)", { id });
      return Response.json(
        {
          error:
            "This locker was just reserved by someone else. Please choose another.",
        },
        { status: 409 },
      );
    }

    // Traer el objeto actualizado para el resto del flujo
    casillero = await prisma.casillero.findUnique({
      where: { id: parseInt(id) },
    });
  } else {
    // Para liberar no necesita la condición extra
    casillero = await prisma.casillero.update({
      where: { id: parseInt(id) },
      data: {
        ocupado: false,
        usuario: null,
        email: null,
        pin: null,
      },
    });
  }

  return Response.json(casillero);
}
