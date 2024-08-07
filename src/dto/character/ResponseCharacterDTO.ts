import { IsString} from 'class-validator';
import { ResponseEstatusDTO } from './ResponseEstatusDTO';
import { ResponseSubCategoryDTO } from './ResponseSubcategoryDTO';
import { CharacterPrisma } from 'src/domain/character/CharacterPrisma';

export class ResponseCharacterDTO {

  id : number

  @IsString()
  name: string;

  estatus: ResponseEstatusDTO;

  subCategory: ResponseSubCategoryDTO;

  @IsString()
  type: string;

  @IsString()
  gender: string;

  @IsString()
  image: string;

  @IsString()
  url: string;

  @IsString()
  created: Date;

  static of(character: CharacterPrisma): ResponseCharacterDTO {
    return {
      id : character.id,
      name : character.name,
      estatus : {
        id : character.estatus.id,
        description: character.estatus.description
      },
      subCategory: {
        id: character.subCategory.id,
        description: character.subCategory.description,
      },
      type: character.type,
      gender : character.gender,
      image : character.image,
      url: character.url,
      created : character.created
    }
  }
}
