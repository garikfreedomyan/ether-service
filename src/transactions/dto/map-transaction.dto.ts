import { TransactionCreationAttrs } from 'src/db/models';
import { GetBlockInfoResponse } from 'src/etherscan';

export class MapTransactionDto implements TransactionCreationAttrs {
  hash: string;
  fromAddress: string;
  toAddress: string | null;
  value: number;
  gas: string;
  gasPrice: string;
  transactionIndex: string;
  blockNumber: number;

  constructor(data: GetBlockInfoResponse['result']['transactions'][0]) {
    this.hash = data.hash;
    this.fromAddress = data.from;
    this.toAddress = data.to;
    this.value = parseInt(data.value);
    this.gas = data.gas;
    this.gasPrice = data.gasPrice;
    this.transactionIndex = data.transactionIndex;
    this.blockNumber = parseInt(data.blockNumber);
  }
}
