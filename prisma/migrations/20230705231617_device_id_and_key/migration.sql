/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "key" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Device_key_key" ON "Device"("key");
