/*
  Warnings:

  - You are about to drop the column `finish_min` on the `CharacterApparition` table. All the data in the column will be lost.
  - You are about to drop the column `finish_sec` on the `CharacterApparition` table. All the data in the column will be lost.
  - You are about to drop the column `init_min` on the `CharacterApparition` table. All the data in the column will be lost.
  - You are about to drop the column `init_sec` on the `CharacterApparition` table. All the data in the column will be lost.
  - Added the required column `finishMin` to the `CharacterApparition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishSec` to the `CharacterApparition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initMin` to the `CharacterApparition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initSec` to the `CharacterApparition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CharacterApparition" DROP COLUMN "finish_min",
DROP COLUMN "finish_sec",
DROP COLUMN "init_min",
DROP COLUMN "init_sec",
ADD COLUMN     "finishMin" INTEGER NOT NULL,
ADD COLUMN     "finishSec" INTEGER NOT NULL,
ADD COLUMN     "initMin" INTEGER NOT NULL,
ADD COLUMN     "initSec" INTEGER NOT NULL;
