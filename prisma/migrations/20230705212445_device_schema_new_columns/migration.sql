-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "canBook" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canCheckin" BOOLEAN NOT NULL DEFAULT false;
