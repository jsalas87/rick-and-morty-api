import { IsInt, IsString } from "class-validator";
import { RequestEstatusDTO } from "../character/RequestEstatusDTO";
import { RequestSubCategoryDTO } from "../character/RequestSubcategoryDTO";
import { Episode } from "@prisma/client";

export class RequestEpisodeDTO {

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

    estatus: RequestEstatusDTO;

    subCategory: RequestSubCategoryDTO;

    toDomanin(estatusId : number, subCategoryId : number) : Omit<Episode, 'id'> {
        return {
          name : this.name,
          estatusId : estatusId,
          subCategoryId : subCategoryId,
          airDate: this.airDate,
          url : this.url,
          duration : this.duration,
          episode: this.episode,
          created : new Date()
        }
      }

}