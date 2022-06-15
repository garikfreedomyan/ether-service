import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db';
import { EtherscanModule } from 'src/etherscan';
import { BlocksModule } from 'src/blocks';
import { TransactionsModule } from 'src/transactions';
import { WalletsModule } from 'src/wallets';

@Module({
  controllers: [],
  providers: [],
  imports: [
    DatabaseModule,
    EtherscanModule,
    BlocksModule,
    TransactionsModule,
    WalletsModule,
  ],
})
export class AppModule {}
