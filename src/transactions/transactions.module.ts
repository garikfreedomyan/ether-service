import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from 'src/db/models';
import { WalletsModule } from 'src/wallets';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [SequelizeModule.forFeature([Transaction]), WalletsModule],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
