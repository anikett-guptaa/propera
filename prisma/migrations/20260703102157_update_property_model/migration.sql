/*
  Warnings:

  - Added the required column `addressLine` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floors` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Property_organizationId_idx";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "addressLine" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "floors" INTEGER NOT NULL,
ADD COLUMN     "pincode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
