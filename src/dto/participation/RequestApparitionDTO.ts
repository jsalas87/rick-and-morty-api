import { CharacterApparition } from "@prisma/client";
import { IsMinuteSecondFormat } from "./is-minute-second-format";

export class RequestApparitionDTO {

    @IsMinuteSecondFormat({message : 'Campo init debe ser de la forma MM:SS'})
    init : string;
    @IsMinuteSecondFormat({message : 'Campo finish debe ser de la forma MM:SS'})
    finish : string;

    toDomain(characterParticipationId : number) : Omit<CharacterApparition, 'id'> {
        return {

            characterparticipationId : characterParticipationId,
            init : this.convertToSeconds(this.init),
            finish : this.convertToSeconds(this.finish)

        }
    }

    convertToSeconds(time: string): number {
        const [minutes, seconds] = time.split(':').map(Number);
        return minutes * 60 + seconds;
    }
}