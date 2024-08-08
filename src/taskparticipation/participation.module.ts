import { Module } from "@nestjs/common";
import { ParticipationController } from "./participation.controller";
import { ParticipationService } from "./participation.service";
import { TaskModule } from "src/task/task.module";

@Module({
    controllers: [ParticipationController],
    providers: [ParticipationService],
    imports: [TaskModule]
})
export class ParticipationModule {

}