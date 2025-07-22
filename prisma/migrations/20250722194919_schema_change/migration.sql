/*
  Warnings:

  - Added the required column `date` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Incident` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "IncidentType" AS ENUM ('UNAUTHORISED_ACCESS', 'GUN_THREAT', 'FACE_RECOGNISED', 'TRAFFIC_CONGESTION');

-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "IncidentType" NOT NULL;
