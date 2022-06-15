import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Wallet } from 'src/db/models';
import { WalletsService } from './wallets.service';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @ApiOperation({ summary: 'Get wallet with max change' })
  @ApiResponse({ status: 200 })
  @Get('/max-change')
  async getWalletWithMaxChange() {
    return await this.walletsService.getWalletWithMaxChange();
  }

  @ApiOperation({ summary: 'Get wallet by ID (address)' })
  @ApiResponse({ status: 200, type: Wallet })
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.walletsService.getWalletById(id);
  }
}
