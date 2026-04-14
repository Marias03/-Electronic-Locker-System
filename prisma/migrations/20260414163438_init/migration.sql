-- CreateTable
CREATE TABLE "Casillero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "tamanio" TEXT NOT NULL,
    "ocupado" BOOLEAN NOT NULL DEFAULT false,
    "usuario" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Casillero_numero_key" ON "Casillero"("numero");
