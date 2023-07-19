-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT '',
    "text" TEXT NOT NULL DEFAULT '',
    "payload" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ping" (
    "id" TEXT NOT NULL,
    "payload" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Basket" (
    "id" TEXT NOT NULL,
    "bookingIntegrationId" TEXT NOT NULL DEFAULT '',
    "bookingIntegrationName" TEXT NOT NULL DEFAULT '',
    "externalReference" JSONB NOT NULL DEFAULT '{}',
    "itemDetails" JSONB NOT NULL DEFAULT '[]',
    "customerDetails" JSONB NOT NULL DEFAULT '{}',
    "paymentDetails" JSONB NOT NULL DEFAULT '{}',
    "hasRemovedItems" BOOLEAN NOT NULL DEFAULT false,
    "payload" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DeviceToLog" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DeviceToPing" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BasketToDevice" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToLog_AB_unique" ON "_DeviceToLog"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToLog_B_index" ON "_DeviceToLog"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToPing_AB_unique" ON "_DeviceToPing"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToPing_B_index" ON "_DeviceToPing"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BasketToDevice_AB_unique" ON "_BasketToDevice"("A", "B");

-- CreateIndex
CREATE INDEX "_BasketToDevice_B_index" ON "_BasketToDevice"("B");

-- AddForeignKey
ALTER TABLE "_DeviceToLog" ADD CONSTRAINT "_DeviceToLog_A_fkey" FOREIGN KEY ("A") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToLog" ADD CONSTRAINT "_DeviceToLog_B_fkey" FOREIGN KEY ("B") REFERENCES "Log"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToPing" ADD CONSTRAINT "_DeviceToPing_A_fkey" FOREIGN KEY ("A") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToPing" ADD CONSTRAINT "_DeviceToPing_B_fkey" FOREIGN KEY ("B") REFERENCES "Ping"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToDevice" ADD CONSTRAINT "_BasketToDevice_A_fkey" FOREIGN KEY ("A") REFERENCES "Basket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToDevice" ADD CONSTRAINT "_BasketToDevice_B_fkey" FOREIGN KEY ("B") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
