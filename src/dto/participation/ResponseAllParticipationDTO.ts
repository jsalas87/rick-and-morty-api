import { ParticipationAll } from "src/domain/participation/ParticipationAll";
import { ResponseInfoCharacterDTO } from "../character/ResponseInfoCharacterDTO";
import { ResponseParticipationDTO } from "./ResponseParticipationDTO";

export class ResponseAllParticipationDTO {
    info : ResponseInfoCharacterDTO
    data : ResponseParticipationDTO[]

    static of(all: ParticipationAll) : ResponseAllParticipationDTO {
        return {
            info : {
                page : all.info.page,
                page_size : all.info.page_size,
                count : all.info.count
            },
            data : all.participations.map(a=> ResponseParticipationDTO.of(a))
        }
    }
}