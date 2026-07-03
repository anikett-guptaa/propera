/*
  Warnings:

  - You are about to drop the column `capacity` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `rent` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[propertyId,roomNumber]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Made the column `floor` on table `Room` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "capacity",
DROP COLUMN "rent",
ALTER COLUMN "floor" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Room_propertyId_roomNumber_key" ON "Room"("propertyId", "roomNumber");
