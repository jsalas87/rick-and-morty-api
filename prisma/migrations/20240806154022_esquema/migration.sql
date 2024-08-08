-- CreateTable
CREATE TABLE "Estatus" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "estatusTypeId" INTEGER NOT NULL,

    CONSTRAINT "Estatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "estatusId" INTEGER NOT NULL,
    "subCategoryId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "airDate" TEXT NOT NULL,
    "episode" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "estatusId" INTEGER NOT NULL,
    "subCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterParticipation" (
    "id" SERIAL NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "CharacterParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterApparition" (
    "id" SERIAL NOT NULL,
    "characterparticipationId" INTEGER NOT NULL,
    "init" TEXT NOT NULL,
    "finish" TEXT NOT NULL,

    CONSTRAINT "CharacterApparition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Estatus" ADD CONSTRAINT "Estatus_estatusTypeId_fkey" FOREIGN KEY ("estatusTypeId") REFERENCES "EstatusType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_estatusId_fkey" FOREIGN KEY ("estatusId") REFERENCES "Estatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_estatusId_fkey" FOREIGN KEY ("estatusId") REFERENCES "Estatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterParticipation" ADD CONSTRAINT "CharacterParticipation_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterParticipation" ADD CONSTRAINT "CharacterParticipation_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterApparition" ADD CONSTRAINT "CharacterApparition_characterparticipationId_fkey" FOREIGN KEY ("characterparticipationId") REFERENCES "CharacterParticipation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
