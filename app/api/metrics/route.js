import { PrismaClient } from "@prisma/client";
import logger from "../../../lib/logger.js";

const prisma = new PrismaClient();

export async function GET() {
  const casilleros = await prisma.casillero.findMany();

  const total = casilleros.length;
  const ocupados = casilleros.filter((c) => c.ocupado).length;
  const disponibles = total - ocupados;
  const pequeños = casilleros.filter((c) => c.tamanio === "pequeño").length;
  const medianos = casilleros.filter((c) => c.tamanio === "mediano").length;
  const grandes = casilleros.filter((c) => c.tamanio === "grande").length;
  const ocupadosPequeños = casilleros.filter(
    (c) => c.tamanio === "pequeño" && c.ocupado
  ).length;
  const ocupadosMedianos = casilleros.filter(
    (c) => c.tamanio === "mediano" && c.ocupado
  ).length;
  const ocupadosGrandes = casilleros.filter(
    (c) => c.tamanio === "grande" && c.ocupado
  ).length;

  logger.info("Metrics requested", { total, ocupados, disponibles });

  const metrics = `
# HELP locker_total Total number of lockers
# TYPE locker_total gauge
locker_total ${total}

# HELP locker_occupied Number of occupied lockers
# TYPE locker_occupied gauge
locker_occupied ${ocupados}

# HELP locker_available Number of available lockers
# TYPE locker_available gauge
locker_available ${disponibles}

# HELP locker_small Total small lockers
# TYPE locker_small gauge
locker_small ${pequeños}

# HELP locker_medium Total medium lockers
# TYPE locker_medium gauge
locker_medium ${medianos}

# HELP locker_large Total large lockers
# TYPE locker_large gauge
locker_large ${grandes}

# HELP locker_small_occupied Occupied small lockers
# TYPE locker_small_occupied gauge
locker_small_occupied ${ocupadosPequeños}

# HELP locker_medium_occupied Occupied medium lockers
# TYPE locker_medium_occupied gauge
locker_medium_occupied ${ocupadosMedianos}

# HELP locker_large_occupied Occupied large lockers
# TYPE locker_large_occupied gauge
locker_large_occupied ${ocupadosGrandes}
  `.trim();

  return new Response(metrics, {
    headers: { "Content-Type": "text/plain" },
  });
}
