import { IsString } from "class-validator";
import { ApparitionPrisma } from "src/domain/participation/ApparitionPrisma";

export class ResponseApparitionDTO {

    id : number;
    @IsString()
    init : string;
    @IsString()
    finish : string;

    static of(apparition : ApparitionPrisma) : ResponseApparitionDTO {
        return {

            id : apparition.id,
            init:  this.convertToTime(apparition.init),
            finish: this.convertToTime(apparition.finish)
        }
    }

     static convertToTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(remainingSeconds).padStart(2, '0');
        
        return `${paddedMinutes}:${paddedSeconds}`;
    }
}