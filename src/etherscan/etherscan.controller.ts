import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EtherscanService } from './etherscan.service';

@ApiTags('Etherscan')
@Controller('etherscan')
export class EtherscanController {
  constructor(private etherscanService: EtherscanService) {}

  @ApiOperation({ summary: 'Start collecting transactions by block' })
  @ApiQuery({
    name: 'from',
    required: false,
  })
  @Get('/start')
  async start(@Query('from') from?: number) {
    return await this.etherscanService.startGettingBlocks(from);
  }

  @ApiOperation({ summary: 'Stop collecting transactions' })
  @Get('/stop')
  async stop() {
    return await this.etherscanService.stopGettingBlocks();
  }
}
