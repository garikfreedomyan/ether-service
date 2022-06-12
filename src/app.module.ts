import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db';

@Module({
  controllers: [],
  providers: [],
  imports: [DatabaseModule],
})
export class AppModule {}
