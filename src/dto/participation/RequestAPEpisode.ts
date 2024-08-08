import { IsString } from "class-validator";

export class RequestAPEpisode {
    @IsString()
    episode : string;
}