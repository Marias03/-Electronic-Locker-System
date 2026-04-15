/*
  Warnings:

  - You are about to drop the column `email` on the `Casillero` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Casillero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "tamanio" TEXT NOT NULL,
    "ocupado" BOOLEAN NOT NULL DEFAULT false,
    "usuario" TEXT,
    "pin" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Casillero" ("createdAt", "id", "numero", "ocupado", "pin", "tamanio", "usuario") SELECT "createdAt", "id", "numero", "ocupado", "pin", "tamanio", "usuario" FROM "Casillero";
DROP TABLE "Casillero";
ALTER TABLE "new_Casillero" RENAME TO "Casillero";
CREATE UNIQUE INDEX "Casillero_numero_key" ON "Casillero"("numero");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
