import { Module } from '@nestjs/common';
import { TaskcharacterModule } from './taskcharacter/taskcharacter.module';

@Module({
  imports: [TaskcharacterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
