import { Module } from "@nestjs/common";
import { TaskcharacterController } from "./taskcharacter.controller";
import { TaskcharacterService } from "./taskcharacter.service";
import { CharactersModule } from "src/characters/characters.module";

@Module({
    controllers: [TaskcharacterController],
    providers: [TaskcharacterService],
    imports: [CharactersModule]
})
export class TaskcharacterModule {

}