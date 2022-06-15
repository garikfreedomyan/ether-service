import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Block } from 'src/db/models';
import { TransactionsModule } from 'src/transactions';
import { BlocksService } from './blocks.service';

@Module({
  imports: [SequelizeModule.forFeature([Block]), TransactionsModule],
  providers: [BlocksService],
  exports: [BlocksService],
})
export class BlocksModule {}
