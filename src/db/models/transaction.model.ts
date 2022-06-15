import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Block } from './block.model';
import { Wallet } from './wallet.model';

export interface TransactionAttrs {
  /** transaction hash (PK) */
  hash: string;
  /** ether sender address */
  fromAddress: string;
  /** the address to send Ether to */
  toAddress: string | null;
  /** ether sender address */
  from: Wallet;
  /** the address to send Ether to */
  to: Wallet | null;
  /** the amount of Ether to send in wei */
  value: number;
  /** gas amount */
  gas: string;
  /** gas price in wei */
  gasPrice: string;
  /** transaction index */
  transactionIndex: string;
  /** black number */
  blockNumber: number;
  /** block info */
  block?: Block;
}

export type TransactionCreationAttrs = Omit<
  TransactionAttrs,
  'block' | 'from' | 'to'
>;

@Table({ tableName: 'transactions', timestamps: false })
export class Transaction
  extends Model<TransactionAttrs, TransactionCreationAttrs>
  implements TransactionAttrs
{
  @Column({ type: DataType.STRING, primaryKey: true })
  hash: string;

  @Column({ type: DataType.DECIMAL({ precision: 30 }), allowNull: false })
  value: number;

  @Column({ type: DataType.STRING, allowNull: false })
  gas: string;

  @Column({ type: DataType.STRING, allowNull: false })
  gasPrice: string;

  @Column({ type: DataType.STRING, allowNull: false })
  transactionIndex: string;

  @ForeignKey(() => Block)
  @Column({ type: DataType.INTEGER, allowNull: false })
  blockNumber: number;

  @BelongsTo(() => Block)
  block: Block;

  @ForeignKey(() => Wallet)
  @Column({ type: DataType.STRING, allowNull: false })
  fromAddress: string;

  @BelongsTo(() => Wallet)
  from: Wallet;

  @ForeignKey(() => Wallet)
  @Column({ type: DataType.STRING, allowNull: true })
  toAddress: string | null;

  @BelongsTo(() => Wallet)
  to: Wallet | null;
}
