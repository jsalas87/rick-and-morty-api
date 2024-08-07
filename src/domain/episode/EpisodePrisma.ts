import { Episode } from "@prisma/client";
import { EstatusPrisma } from "../character/EstatusPrisma";
import { SubcategoryPrisma } from "../character/SubCategoryPrisma";

export class EpisodePrisma implements Episode {
    id: number;
    name: string;
    airDate: string;
    episode: string;
    url: string;
    created: Date;
    duration: number;
    estatusId: number;
    subCategoryId: number;
    estatus : EstatusPrisma;
    subCategory : SubcategoryPrisma;
    
}