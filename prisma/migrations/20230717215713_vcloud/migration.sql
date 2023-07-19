-- CreateTable
CREATE TABLE "Vcloud" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL DEFAULT '',
    "serviceName" TEXT NOT NULL DEFAULT '',
    "registerId" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "merchantName" TEXT NOT NULL DEFAULT '',
    "payload" JSONB NOT NULL DEFAULT '{}',
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Vcloud_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vcloud_id_key" ON "Vcloud"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Vcloud_organizationId_key" ON "Vcloud"("organizationId");

-- AddForeignKey
ALTER TABLE "Vcloud" ADD CONSTRAINT "Vcloud_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
