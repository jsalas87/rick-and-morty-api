import { IsString, Matches } from 'class-validator';

export class CharacterApparitionDto {
  @IsString()
  @Matches(/^\d{1,2}:\d{2}$/, {
    message: 'init must be in the format MM:SS',
  })
  init: string;

  @IsString()
  @Matches(/^\d{1,2}:\d{2}$/, {
    message: 'finish must be in the format MM:SS',
  })
  finish: string;

  characterparticipationId: number;
}
