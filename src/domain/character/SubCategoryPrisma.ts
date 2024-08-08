import { SubCategory } from "@prisma/client";

export class SubcategoryPrisma implements SubCategory {
    id: number;
    description: string;
    categoryId: number;
    
}