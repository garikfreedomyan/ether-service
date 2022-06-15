import { BlockCreationAttrs, TransactionCreationAttrs } from 'src/db/models';
import { GetBlockInfoResponse } from 'src/etherscan';
import { MapTransactionDto } from 'src/transactions';

export class MapBlockDto implements BlockCreationAttrs {
  number: number;
  hash: string;
  gasUsed: string;
  timestamp: Date;
  parentHash: string;
  size: string;
  transactions: TransactionCreationAttrs[];

  constructor(data: GetBlockInfoResponse['result']) {
    this.number = parseInt(data.number);
    this.hash = data.hash;
    this.gasUsed = data.gasUsed;
    this.timestamp = new Date(parseInt(data.timestamp) * 1000);
    this.parentHash = data.parentHash;
    this.size = data.size;
    this.transactions =
      data.transactions?.map(
        (transaction) => new MapTransactionDto(transaction),
      ) ?? [];
  }
}
