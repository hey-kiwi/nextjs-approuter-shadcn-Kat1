-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_organizationId_fkey";

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
