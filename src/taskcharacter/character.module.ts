import { Module } from "@nestjs/common";
import { CharacterController } from "./character.controller";
import { CharacterService } from "./character.service";
import { TaskModule } from "src/task/task.module";

@Module({
    controllers: [CharacterController],
    providers: [CharacterService],
    imports: [TaskModule]
})
export class CharacterModule {

}