import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { BlocksService } from 'src/blocks';
import { MapBlockDto } from 'src/blocks/dto';
import { GetBlockInfoResponse } from './etherscan.types';

@Injectable()
export class EtherscanService {
  private getBlocksIntervalId: NodeJS.Timer;
  private lastBlockNumber: number;
  private requestInterval: number;

  constructor(
    private httpService: HttpService,
    private blocksService: BlocksService,
  ) {
    this.lastBlockNumber = Number(process.env.START_BLOCK_NUMBER);
    this.requestInterval =
      Number(process.env.ETHERSCAN_REQUEST_INTERVAL) ?? 10000;
  }

  getBlockByNumber(blockNumber: number) {
    try {
      const info = this.httpService
        .get<GetBlockInfoResponse>('https://api.etherscan.io/api', {
          params: {
            module: 'proxy',
            action: 'eth_getBlockByNumber',
            tag: '0x' + blockNumber.toString(16),
            boolean: true,
          },
        })
        .pipe(map((response) => response.data.result));

      return info;
    } catch (error) {
      console.log(error);
    }
  }

  async startGettingBlocks(startFrom?: number) {
    if (startFrom) {
      this.lastBlockNumber = startFrom;
    } else {
      const lastBlockInDB = await this.blocksService.findLastBlockNumber();

      if (lastBlockInDB) {
        this.lastBlockNumber = lastBlockInDB + 1;
      }
    }

    this.getBlocksIntervalId = setInterval(async () => {
      console.log(this.lastBlockNumber);
      const block = await this.blocksService.findBlockByNumber(
        this.lastBlockNumber,
      );

      if (!block) {
        this.getBlockByNumber(this.lastBlockNumber).subscribe(async (data) => {
          if (!data) return;

          await this.blocksService.createBlock(new MapBlockDto(data));
        });
      }

      this.lastBlockNumber++;
    }, this.requestInterval);

    return { status: 'started', from: this.lastBlockNumber };
  }

  async stopGettingBlocks() {
    if (this.getBlocksIntervalId) {
      clearInterval(this.getBlocksIntervalId);
    }

    return { status: 'stoped' };
  }
}
