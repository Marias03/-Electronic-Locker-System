const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const casilleros = [
    { numero: 1, tamanio: "pequeño" },
    { numero: 2, tamanio: "pequeño" },
    { numero: 3, tamanio: "pequeño" },
    { numero: 4, tamanio: "pequeño" },
    { numero: 5, tamanio: "mediano" },
    { numero: 6, tamanio: "mediano" },
    { numero: 7, tamanio: "mediano" },
    { numero: 8, tamanio: "grande" },
    { numero: 9, tamanio: "grande" },
    { numero: 10, tamanio: "grande" },
  ];

  for (const c of casilleros) {
    await prisma.casillero.create({ data: c });
  }

  console.log("✅ 10 casilleros creados!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
