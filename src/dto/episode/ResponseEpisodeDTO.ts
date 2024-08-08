import { IsInt, IsString } from "class-validator";
import { ResponseEstatusDTO } from "../character/ResponseEstatusDTO";
import { ResponseSubCategoryDTO } from "../character/ResponseSubcategoryDTO";
import { EpisodePrisma } from "src/domain/episode/EpisodePrisma";

export class ResponseEpisodeDTO {

    id : number;

    @IsString()
    name: string;

    @IsString()
    airDate : string;

    @IsString()
    url : string;

    @IsInt()
    duration : number;

    @IsString()
    episode : string;

    estatus: ResponseEstatusDTO;

    subCategory: ResponseSubCategoryDTO;

    created : Date;

    static of(episode: EpisodePrisma): ResponseEpisodeDTO {
        return {
          id : episode.id,
          name : episode.name,
          estatus : {
            id : episode.estatus.id,
            description: episode.estatus.description
          },
          subCategory: {
            id: episode.subCategory.id,
            description: episode.subCategory.description,
          },
          airDate: episode.airDate,
          url: episode.url,
          duration : episode.duration,
          episode : episode.episode,
          created : episode.created
        }
      }

}