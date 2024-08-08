import { Module } from '@nestjs/common';
import { CharacterModule } from './taskcharacter/character.module';
import { ParticipationModule } from './taskparticipation/participation.module';

@Module({
  imports: [CharacterModule, ParticipationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
