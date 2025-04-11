-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cobranca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "valor" REAL NOT NULL,
    "dataVencimento" DATETIME NOT NULL,
    "metodoEnvio" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Cobranca_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cobranca" ("clienteId", "dataVencimento", "id", "metodoEnvio", "status", "valor") SELECT "clienteId", "dataVencimento", "id", "metodoEnvio", "status", "valor" FROM "Cobranca";
DROP TABLE "Cobranca";
ALTER TABLE "new_Cobranca" RENAME TO "Cobranca";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
