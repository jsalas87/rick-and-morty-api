/*
  Warnings:

  - You are about to drop the column `finishMin` on the `CharacterApparition` table. All the data in the column will be lost.
  - You are about to drop the column `finishSec` on the `CharacterApparition` table. All the data in the column will be lost.
  - You are about to drop the column `initMin` on the `CharacterApparition` table. All the data in the column will be lost.
  - You are about to drop the column `initSec` on the `CharacterApparition` table. All the data in the column will be lost.
  - Added the required column `finish` to the `CharacterApparition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `init` to the `CharacterApparition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CharacterApparition" DROP COLUMN "finishMin",
DROP COLUMN "finishSec",
DROP COLUMN "initMin",
DROP COLUMN "initSec",
ADD COLUMN     "finish" INTEGER NOT NULL,
ADD COLUMN     "init" INTEGER NOT NULL;
