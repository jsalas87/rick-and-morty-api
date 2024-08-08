import { RequestApparitionDTO } from "./RequestApparitionDTO";
import { RequestAPEpisode } from "./RequestAPEpisode";
import { RequestAPCharacter } from "./RequestAPCharacter";
import { CharacterParticipation, Episode } from "@prisma/client";

export class RequestParticipationDTO {

    episode : RequestAPEpisode;
    character : RequestAPCharacter;
    apparitions : RequestApparitionDTO[];

    toDomain(episodeId : number) :  Omit<CharacterParticipation, 'id'>{
        return {
            episodeId : episodeId,
            characterId : this.character.id,

        }
    }
    
}