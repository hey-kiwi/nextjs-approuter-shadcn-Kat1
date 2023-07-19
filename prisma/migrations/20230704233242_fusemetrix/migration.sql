-- CreateTable
CREATE TABLE "Fusemetrix" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "payload" JSONB,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Fusemetrix_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fusemetrix_id_key" ON "Fusemetrix"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Fusemetrix_organizationId_key" ON "Fusemetrix"("organizationId");

-- AddForeignKey
ALTER TABLE "Fusemetrix" ADD CONSTRAINT "Fusemetrix_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
