import { Module } from '@nestjs/common';
import { CharacterModule } from './taskcharacter/character.module';

@Module({
  imports: [CharacterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
