import { ParticipationPrisma } from "src/domain/participation/ParticipationPrisma";
import { ResponseCharacterDTO } from "../character/ResponseCharacterDTO";
import { ResponseEpisodeDTO } from "../episode/ResponseEpisodeDTO";
import { ResponseApparitionDTO } from "./ResponseApparitionDTO";
import { ApparitionPrisma } from "src/domain/participation/ApparitionPrisma";

export class ResponseParticipationDTO {
    
    id : number;
    episode : ResponseEpisodeDTO;
    character : ResponseCharacterDTO;
    apparitions : ResponseApparitionDTO[];

    static of(participationPrisma : ParticipationPrisma) : ResponseParticipationDTO {

        return {
            id : participationPrisma.id,
            episode : ResponseEpisodeDTO.of(participationPrisma.episode),
            character : ResponseCharacterDTO.of(participationPrisma.character),
            apparitions : participationPrisma.apparitions.map(a => ResponseApparitionDTO.of(a))
        }

    }

}