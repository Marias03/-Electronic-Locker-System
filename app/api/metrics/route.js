import { PrismaClient } from "@prisma/client";
import logger from "../../../app/lib/logger.mjs";

const prisma = new PrismaClient();

export async function GET() {
  const casilleros = await prisma.casillero.findMany();

  const total = casilleros.length;
  const occupied = casilleros.filter((c) => c.ocupado).length;
  const available = total - occupied;
  const small = casilleros.filter((c) => c.tamanio === "pequeño").length;
  const medium = casilleros.filter((c) => c.tamanio === "mediano").length;
  const large = casilleros.filter((c) => c.tamanio === "grande").length;
  const smallOccupied = casilleros.filter(
    (c) => c.tamanio === "pequeño" && c.ocupado
  ).length;
  const mediumOccupied = casilleros.filter(
    (c) => c.tamanio === "mediano" && c.ocupado
  ).length;
  const largeOccupied = casilleros.filter(
    (c) => c.tamanio === "grande" && c.ocupado
  ).length;

  logger.info("Metrics requested", { total, occupied, available });

  const metrics = `
# HELP locker_total Total number of lockers
# TYPE locker_total gauge
locker_total ${total}

# HELP locker_occupied Number of occupied lockers
# TYPE locker_occupied gauge
locker_occupied ${occupied}

# HELP locker_available Number of available lockers
# TYPE locker_available gauge
locker_available ${available}

# HELP locker_small Total small lockers
# TYPE locker_small gauge
locker_small ${small}

# HELP locker_medium Total medium lockers
# TYPE locker_medium gauge
locker_medium ${medium}

# HELP locker_large Total large lockers
# TYPE locker_large gauge
locker_large ${large}

# HELP locker_small_occupied Occupied small lockers
# TYPE locker_small_occupied gauge
locker_small_occupied ${smallOccupied}

# HELP locker_medium_occupied Occupied medium lockers
# TYPE locker_medium_occupied gauge
locker_medium_occupied ${mediumOccupied}

# HELP locker_large_occupied Occupied large lockers
# TYPE locker_large_occupied gauge
locker_large_occupied ${largeOccupied}
  `.trim();

  return new Response(metrics, {
    headers: { "Content-Type": "text/plain" },
  });
}
