/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `projects` on the `Project` table. All the data in the column will be lost.
  - Added the required column `concepts` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currStatus` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extractedText` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectOriginals` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Project_email_key";

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "projects",
ADD COLUMN     "concepts" JSONB NOT NULL,
ADD COLUMN     "currStatus" TEXT NOT NULL,
ADD COLUMN     "extractedText" JSONB NOT NULL,
ADD COLUMN     "projectOriginals" JSONB NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Project_id_seq";
