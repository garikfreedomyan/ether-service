import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Transaction } from './transaction.model';

export interface WalletAttrs {
  /** wallet address(number) */
  address: string;
  /** list of transactions */
  transactions: Transaction[];
}

export type WalletCreationAttrs = Omit<WalletAttrs, 'transactions'>;

@Table({ tableName: 'wallets', timestamps: false })
export class Wallet
  extends Model<WalletAttrs, WalletCreationAttrs>
  implements WalletAttrs
{
  @Column({ type: DataType.STRING, primaryKey: true })
  address: string;

  @HasMany(() => Transaction, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];
}
