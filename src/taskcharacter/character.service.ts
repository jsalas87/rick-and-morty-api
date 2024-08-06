import { Injectable } from "@nestjs/common";
import { EstatusType } from "@prisma/client";
import { TaskService } from "src/task/task.service";

@Injectable()
export class CharacterService {

    constructor (private character : TaskService){}

    async getAllTask() : Promise<EstatusType[]> {
        return this.character.estatusType.findMany()
    }

    async getTaskById(id : number) : Promise<EstatusType> {
        return  this.character.estatusType.findUnique({
            where: {
                id
            }
        })

    }

    async createTask(data : EstatusType) : Promise<EstatusType> {
        return this.character.estatusType.create({
            data 
        })
    }

    async updateTask(id: number, data : EstatusType) : Promise<EstatusType> {
        return this.character.estatusType.update({
            where: {
                id
            },
            data 
        })
    }

    async deleteTask(id: number) : Promise<EstatusType> {
        return this.character.estatusType.delete({
            where: {
                id
            }
        })
    }

}