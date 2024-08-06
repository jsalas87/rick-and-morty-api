/*
  Warnings:

  - You are about to drop the column `finish` on the `CharacterApparition` table. All the data in the column will be lost.
  - You are about to drop the column `init` on the `CharacterApparition` table. All the data in the column will be lost.
  - Added the required column `finish_min` to the `CharacterApparition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finish_sec` to the `CharacterApparition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `init_min` to the `CharacterApparition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `init_sec` to the `CharacterApparition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CharacterApparition" DROP COLUMN "finish",
DROP COLUMN "init",
ADD COLUMN     "finish_min" INTEGER NOT NULL,
ADD COLUMN     "finish_sec" INTEGER NOT NULL,
ADD COLUMN     "init_min" INTEGER NOT NULL,
ADD COLUMN     "init_sec" INTEGER NOT NULL;
