import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BlocksModule } from 'src/blocks';
import { EtherscanController } from './etherscan.controller';
import { EtherscanService } from './etherscan.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    BlocksModule,
  ],
  controllers: [EtherscanController],
  providers: [EtherscanService],
})
export class EtherscanModule {}
