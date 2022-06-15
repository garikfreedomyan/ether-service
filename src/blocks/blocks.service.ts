import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Block, BlockCreationAttrs } from 'src/db/models';
import { TransactionsService } from 'src/transactions';

@Injectable()
export class BlocksService {
  constructor(
    @InjectModel(Block) private blockRepository: typeof Block,
    private transactionsService: TransactionsService,
  ) {}

  async createBlock(data: BlockCreationAttrs) {
    const block = await this.blockRepository.create(data);

    await this.transactionsService.createMany(data.transactions);

    return block;
  }

  async findBlockByNumber(number: number): Promise<Block | null> {
    return await this.blockRepository.findByPk(number);
  }

  async findLastBlockNumber(): Promise<number | void> {
    const blocks = await this.blockRepository.findAll({
      limit: 1,
      order: [['number', 'DESC']],
      attributes: ['number'],
    });

    return blocks[0]?.number;
  }
}
