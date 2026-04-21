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
      { status: 429 }
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
        { status: 400 }
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

  const casillero = await prisma.casillero.update({
    where: { id: parseInt(id) },
    data: {
      ocupado,
      usuario: ocupado ? usuario : null,
      email: ocupado ? email : null,
      pin: nuevoPIN,
    },
  });

  if (ocupado) {
    logger.info("Locker reserved", {
      locker: casillero.numero,
      user: usuario,
      email,
    });
  } else {
    logger.info("Locker released", { locker: casillero.numero });
  }

  if (ocupado && email) {
    await transporter.sendMail({
      from: `"Electronic Locker System" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "🔐 Your Locker PIN",
      html: `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 24px; background: #1e293b; color: white; border-radius: 12px;">
          <h1 style="color: white;">🧳 Electronic Locker System</h1>
          <p style="color: #94a3b8;">Hi <strong style="color: white;">${usuario}</strong>, your locker has been reserved!</p>
          <div style="background: #0f172a; border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
            <p style="color: #94a3b8; margin: 0 0 8px 0;">Locker #${casillero.numero} — Your PIN code</p>
            <div style="font-size: 48px; font-weight: bold; color: #4ade80; letter-spacing: 8px;">${nuevoPIN}</div>
          </div>
          <p style="color: #94a3b8; font-size: 14px;">Keep this PIN safe — you'll need it to release your locker.</p>
        </div>
      `,
    });
  }

  return Response.json(casillero);
}
