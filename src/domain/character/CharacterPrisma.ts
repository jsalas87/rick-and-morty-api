import { Character } from "@prisma/client";
import { EstatusPrisma } from "./EstatusPrisma";
import { SubcategoryPrisma } from "./SubCategoryPrisma";

export class CharacterPrisma implements Character {
    id: number;
    name: string;
    estatusId: number;
    subCategoryId: number;
    type: string;
    gender: string;
    image: string;
    url: string;
    created: Date;
    estatus : EstatusPrisma;
    subCategory : SubcategoryPrisma

}