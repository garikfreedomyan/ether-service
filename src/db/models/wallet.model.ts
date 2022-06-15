import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: '0x986a2fca9eda0e06fbf7839b89bfc006ee2a23dd',
    description: 'wallet address',
  })
  @Column({ type: DataType.STRING, primaryKey: true })
  address: string;

  @ApiProperty({
    example: [],
    description: 'wallet transactions',
  })
  @HasMany(() => Transaction, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];
}
