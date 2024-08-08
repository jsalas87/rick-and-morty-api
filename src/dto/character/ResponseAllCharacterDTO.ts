import { CharacterAll } from "src/domain/character/CharacterAll";
import { ResponseCharacterDTO } from "./ResponseCharacterDTO";
import { ResponseInfoCharacterDTO } from "./ResponseInfoCharacterDTO";

export class ResponseAllCharacterDTO {
    info : ResponseInfoCharacterDTO
    data : ResponseCharacterDTO[]

    static of(all: CharacterAll) : ResponseAllCharacterDTO{

        return {
            info : {
                page : all.info.page,
                count : all.info.count,
                page_size: all.info.page_size
            },
            data : all.characters.map( a => ResponseCharacterDTO.of(a))
        }
    }

}