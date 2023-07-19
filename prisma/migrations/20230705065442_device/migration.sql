-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "bookingIntegration" JSONB DEFAULT '{}',
    "paymentIntegration" JSONB DEFAULT '{}',
    "acceptStripe" BOOLEAN NOT NULL DEFAULT false,
    "onMaintenance" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_id_key" ON "Device"("id");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
