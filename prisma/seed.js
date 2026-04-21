const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.casillero.deleteMany();

  const tamanios = [
    "pequeño",
    "pequeño",
    "pequeño",
    "pequeño",
    "pequeño",
    "pequeño",
    "pequeño",
    "mediano",
    "mediano",
    "mediano",
    "mediano",
    "mediano",
    "mediano",
    "grande",
    "grande",
    "grande",
    "grande",
    "grande",
    "grande",
    "grande",
  ];

  for (let i = 0; i < tamanios.length; i++) {
    await prisma.casillero.create({
      data: {
        numero: i + 1,
        tamanio: tamanios[i],
        ocupado: false,
      },
    });
  }
  console.log("✅ 20 casilleros creados!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
