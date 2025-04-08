/*
  Warnings:

  - You are about to drop the column `descricao` on the `Cobranca` table. All the data in the column will be lost.
  - You are about to drop the column `vencimento` on the `Cobranca` table. All the data in the column will be lost.
  - Added the required column `metodoEnvio` to the `Cobranca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Cobranca` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cobranca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "valor" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "metodoEnvio" TEXT NOT NULL,
    "criadaEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Cobranca_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cobranca" ("clienteId", "id", "valor") SELECT "clienteId", "id", "valor" FROM "Cobranca";
DROP TABLE "Cobranca";
ALTER TABLE "new_Cobranca" RENAME TO "Cobranca";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
