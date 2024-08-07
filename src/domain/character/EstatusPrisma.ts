import { Estatus } from "@prisma/client";

export class EstatusPrisma implements Estatus {
    id: number;
    description: string;
    estatusTypeId: number;
    
}