import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wallet } from 'src/db/models';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';

@Module({
  imports: [SequelizeModule.forFeature([Wallet])],
  providers: [WalletsService],
  exports: [WalletsService],
  controllers: [WalletsController],
})
export class WalletsModule {}
