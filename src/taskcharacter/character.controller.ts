import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CharacterService } from "./character.service";
import { EstatusType } from "@prisma/client";

@Controller('character')
export class CharacterController {

    constructor(private readonly taskService : CharacterService) {}

    @Get()
    async getAllTask() {
        return this.taskService.getAllTask()
    }

    @Post()
    async createTask(@Body() data : EstatusType) {
        return this.taskService.createTask(data)

    }

    @Get(':id')
    async getTaskById(@Param('id', ParseIntPipe) id : number) {
        const task = await this.taskService.getTaskById(Number(id))
        if (!task) throw new NotFoundException('Character type '+ id + ' No encontrada')
        return task 
    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) id : number) {
        try {
            return await this.taskService.deleteTask(Number(id))
        } catch(error) {
            throw new NotFoundException('Character type '+ id + ' No encontrada')
        }
    }

    @Put(':id')
    async updateTask(@Param('id', ParseIntPipe) id : number, @Body() data : EstatusType) {
        try {
            return await this.taskService.updateTask(Number(id), data)
        } catch(error) {
            throw new NotFoundException('Character type id '+ id + ' No encontrada')
        }

    }

}