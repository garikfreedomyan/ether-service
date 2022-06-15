import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction, TransactionCreationAttrs } from 'src/db/models';
import { WalletsService } from 'src/wallets';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction) private transactionRepository: typeof Transaction,
    private walletsService: WalletsService,
  ) {}

  async create(data: TransactionCreationAttrs) {
    try {
      if (data.fromAddress) await this.walletsService.create(data.fromAddress);
      if (data.toAddress) await this.walletsService.create(data.toAddress);

      return await this.transactionRepository.create(data);
    } catch (error) {
      console.log(error);
    }
  }

  async createMany(data: TransactionCreationAttrs[]) {
    const uniqueWalletAddresses = new Set<string>();
    data.forEach((tr) => {
      if (tr.fromAddress) {
        uniqueWalletAddresses.add(tr.fromAddress);
      }
      if (tr.toAddress) {
        uniqueWalletAddresses.add(tr.toAddress);
      }
    });

    await this.walletsService.createMany(Array.from(uniqueWalletAddresses));
    await Promise.all(data.map((tr) => this.transactionRepository.create(tr)));
  }
}
