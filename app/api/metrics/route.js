import { PrismaClient } from "@prisma/client";
import logger from "../../../app/lib/logger.mjs";

const prisma = new PrismaClient();

export async function GET() {
  const start = Date.now();

  const [casilleros, pagos, sucursales, historial] = await Promise.all([
    prisma.casillero.findMany(),
    prisma.pago.findMany(),
    prisma.sucursal.findMany(),
    prisma.historial.findMany(),
  ]);

  const responseTime = Date.now() - start;

  // Casilleros básicos
  const total = casilleros.length;
  const occupied = casilleros.filter((c) => c.ocupado).length;
  const available = total - occupied;
  const occupancyRate = total > 0 ? ((occupied / total) * 100).toFixed(2) : 0;

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

  // Tasa de ocupación por tamaño
  const smallOccupancyRate =
    small > 0 ? ((smallOccupied / small) * 100).toFixed(2) : 0;
  const mediumOccupancyRate =
    medium > 0 ? ((mediumOccupied / medium) * 100).toFixed(2) : 0;
  const largeOccupancyRate =
    large > 0 ? ((largeOccupied / large) * 100).toFixed(2) : 0;

  // Casilleros con más de 3h ocupados (posible abandono)
  const now = Date.now();
  const abandonedLockers = casilleros.filter((c) => {
    if (!c.ocupado || !c.reservadoEn) return false;
    const hoursOccupied = (now - new Date(c.reservadoEn).getTime()) / 3600000;
    return hoursOccupied > 3;
  }).length;

  // Duración promedio de reservas completadas
  const reservas = historial.filter((h) => h.accion === "reserved");
  const releases = historial.filter((h) => h.accion === "released");
  const durations = reservas
    .map((r) => {
      const release = releases.find(
        (rel) =>
          rel.numero === r.numero &&
          rel.sucursalId === r.sucursalId &&
          new Date(rel.createdAt) > new Date(r.createdAt),
      );
      if (!release) return null;
      return (
        (new Date(release.createdAt).getTime() -
          new Date(r.createdAt).getTime()) /
        60000
      );
    })
    .filter(Boolean);
  const avgDurationMinutes =
    durations.length > 0
      ? (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(2)
      : 0;

  // Pagos y revenue
  const totalPayments = pagos.length;
  const totalRevenue = pagos.reduce((sum, p) => sum + (p.monto || 0), 0);
  const avgRevenuePerPayment =
    totalPayments > 0 ? (totalRevenue / totalPayments).toFixed(2) : 0;

  // Revenue por tamaño
  const revenueSmall = pagos
    .filter((p) => p.tamanio === "pequeño")
    .reduce((sum, p) => sum + (p.monto || 0), 0);
  const revenueMedium = pagos
    .filter((p) => p.tamanio === "mediano")
    .reduce((sum, p) => sum + (p.monto || 0), 0);
  const revenueLarge = pagos
    .filter((p) => p.tamanio === "grande")
    .reduce((sum, p) => sum + (p.monto || 0), 0);

  // Horas más populares
  const hourCounts = Array(24).fill(0);
  pagos.forEach((p) => {
    const hour = new Date(p.createdAt).getHours();
    hourCounts[hour]++;
  });
  const peakHour = hourCounts.indexOf(Math.max(...hourCounts));

  // Por sucursal
  const revenuePerBranch = sucursales.map((s) => {
    const branchPayments = pagos.filter((p) => p.sucursalId === s.id);
    const revenue = branchPayments.reduce((sum, p) => sum + (p.monto || 0), 0);
    const branchOccupied = casilleros.filter(
      (c) => c.sucursalId === s.id && c.ocupado,
    ).length;
    const branchTotal = casilleros.filter((c) => c.sucursalId === s.id).length;
    const branchRate =
      branchTotal > 0 ? ((branchOccupied / branchTotal) * 100).toFixed(2) : 0;
    return {
      slug: s.slug,
      count: branchPayments.length,
      revenue,
      occupied: branchOccupied,
      total: branchTotal,
      rate: branchRate,
    };
  });

  logger.info("Metrics requested", {
    total,
    occupied,
    available,
    totalRevenue,
  });

  const branchMetrics = revenuePerBranch
    .map((b) =>
      `
# HELP locker_branch_payments_total Total payments per branch
# TYPE locker_branch_payments_total gauge
locker_branch_payments_total{branch="${b.slug}"} ${b.count}

# HELP locker_branch_revenue_total Total revenue per branch
# TYPE locker_branch_revenue_total gauge
locker_branch_revenue_total{branch="${b.slug}"} ${b.revenue}

# HELP locker_branch_occupancy_rate Occupancy rate per branch (%)
# TYPE locker_branch_occupancy_rate gauge
locker_branch_occupancy_rate{branch="${b.slug}"} ${b.rate}

# HELP locker_branch_occupied Occupied lockers per branch
# TYPE locker_branch_occupied gauge
locker_branch_occupied{branch="${b.slug}"} ${b.occupied}`.trim(),
    )
    .join("\n\n");

  const hourMetrics = hourCounts
    .map(
      (count, hour) => `locker_reservations_by_hour{hour="${hour}"} ${count}`,
    )
    .join("\n");

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

# HELP locker_occupancy_rate Overall occupancy rate (%)
# TYPE locker_occupancy_rate gauge
locker_occupancy_rate ${occupancyRate}

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

# HELP locker_small_occupancy_rate Small lockers occupancy rate (%)
# TYPE locker_small_occupancy_rate gauge
locker_small_occupancy_rate ${smallOccupancyRate}

# HELP locker_medium_occupancy_rate Medium lockers occupancy rate (%)
# TYPE locker_medium_occupancy_rate gauge
locker_medium_occupancy_rate ${mediumOccupancyRate}

# HELP locker_large_occupancy_rate Large lockers occupancy rate (%)
# TYPE locker_large_occupancy_rate gauge
locker_large_occupancy_rate ${largeOccupancyRate}

# HELP locker_abandoned Lockers occupied more than 3 hours
# TYPE locker_abandoned gauge
locker_abandoned ${abandonedLockers}

# HELP locker_avg_duration_minutes Average reservation duration in minutes
# TYPE locker_avg_duration_minutes gauge
locker_avg_duration_minutes ${avgDurationMinutes}

# HELP locker_payments_total Total number of payments
# TYPE locker_payments_total gauge
locker_payments_total ${totalPayments}

# HELP locker_revenue_total Total revenue in rubles
# TYPE locker_revenue_total gauge
locker_revenue_total ${totalRevenue}

# HELP locker_avg_revenue_per_payment Average revenue per payment
# TYPE locker_avg_revenue_per_payment gauge
locker_avg_revenue_per_payment ${avgRevenuePerPayment}

# HELP locker_revenue_small Revenue from small lockers
# TYPE locker_revenue_small gauge
locker_revenue_small ${revenueSmall}

# HELP locker_revenue_medium Revenue from medium lockers
# TYPE locker_revenue_medium gauge
locker_revenue_medium ${revenueMedium}

# HELP locker_revenue_large Revenue from large lockers
# TYPE locker_revenue_large gauge
locker_revenue_large ${revenueLarge}

# HELP locker_peak_hour Hour of day with most reservations
# TYPE locker_peak_hour gauge
locker_peak_hour ${peakHour}

# HELP locker_reservations_by_hour Reservations count by hour of day
# TYPE locker_reservations_by_hour gauge
${hourMetrics}

# HELP locker_api_response_time_ms API response time in milliseconds
# TYPE locker_api_response_time_ms gauge
locker_api_response_time_ms ${responseTime}

${branchMetrics}
  `.trim();

  return new Response(metrics, {
    headers: { "Content-Type": "text/plain" },
  });
}
