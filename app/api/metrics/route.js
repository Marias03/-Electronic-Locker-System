import { PrismaClient } from "@prisma/client";
import logger from "../../../app/lib/logger.mjs";

const prisma = new PrismaClient();

export async function GET() {
  const [casilleros, pagos, sucursales] = await Promise.all([
    prisma.casillero.findMany(),
    prisma.pago.findMany(),
    prisma.sucursal.findMany(),
  ]);

  const total = casilleros.length;
  const occupied = casilleros.filter((c) => c.ocupado).length;
  const available = total - occupied;
  const small = casilleros.filter((c) => c.tamanio === "pequeño").length;
  const medium = casilleros.filter((c) => c.tamanio === "mediano").length;
  const large = casilleros.filter((c) => c.tamanio === "grande").length;
  const smallOccupied = casilleros.filter(
    (c) => c.tamanio === "pequeño" && c.ocupado,
  ).length;
  const mediumOccupied = casilleros.filter(
    (c) => c.tamanio === "mediano" && c.ocupado,
  ).length;
  const largeOccupied = casilleros.filter(
    (c) => c.tamanio === "grande" && c.ocupado,
  ).length;

  const totalPayments = pagos.length;
  const totalRevenue = pagos.reduce((sum, p) => sum + (p.monto || 0), 0);

  const revenuePerBranch = sucursales.map((s) => {
    const branchPayments = pagos.filter((p) => p.sucursalId === s.id);
    const revenue = branchPayments.reduce((sum, p) => sum + (p.monto || 0), 0);
    return { slug: s.slug, count: branchPayments.length, revenue };
  });

  logger.info("Metrics requested", { total, occupied, available });

  const branchMetrics = revenuePerBranch
    .map((b) =>
      `
# HELP locker_branch_payments_total Total payments per branch
# TYPE locker_branch_payments_total gauge
locker_branch_payments_total{branch="${b.slug}"} ${b.count}

# HELP locker_branch_revenue_total Total revenue per branch
# TYPE locker_branch_revenue_total gauge
locker_branch_revenue_total{branch="${b.slug}"} ${b.revenue}
  `.trim(),
    )
    .join("\n\n");

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

# HELP locker_payments_total Total number of payments
# TYPE locker_payments_total gauge
locker_payments_total ${totalPayments}

# HELP locker_revenue_total Total revenue in rubles
# TYPE locker_revenue_total gauge
locker_revenue_total ${totalRevenue}

${branchMetrics}
  `.trim();

  return new Response(metrics, {
    headers: { "Content-Type": "text/plain" },
  });
}
