/*
  Warnings:

  - You are about to drop the column `criadaEm` on the `Cobranca` table. All the data in the column will be lost.
  - Added the required column `dataVencimento` to the `Cobranca` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cobranca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" REAL NOT NULL,
    "dataVencimento" DATETIME NOT NULL,
    "metodoEnvio" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    CONSTRAINT "Cobranca_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cobranca" ("clienteId", "id", "metodoEnvio", "status", "valor") SELECT "clienteId", "id", "metodoEnvio", "status", "valor" FROM "Cobranca";
DROP TABLE "Cobranca";
ALTER TABLE "new_Cobranca" RENAME TO "Cobranca";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
