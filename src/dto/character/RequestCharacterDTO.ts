import { IsString } from 'class-validator';
import { RequestEstatusDTO } from './RequestEstatusDTO';
import { RequestSubCategoryDTO } from './RequestSubcategoryDTO';
import { Character } from '@prisma/client';

export class RequestCharacterDTO {
  @IsString()
  name: string;

  estatus: RequestEstatusDTO;

  subCategory: RequestSubCategoryDTO;

  @IsString()
  type: string;

  @IsString()
  gender: string;

  @IsString()
  image: string;

  @IsString()
  url: string;

   toDomanin(estatusId : number, subCategoryId : number) : Omit<Character, 'id'> {
    return {
      name : this.name,
      estatusId : estatusId,
      subCategoryId : subCategoryId,
      type: this.type,
      gender : this.gender,
      image : this.image,
      url: this.url,
      created : new Date()
    }
  }
}
