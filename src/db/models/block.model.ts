import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Transaction, TransactionCreationAttrs } from './transaction.model';

export interface BlockAttrs {
  /** block number (PK) */
  number: number;
  /** block hash */
  hash: string;
  /** gas used */
  gasUsed: string;
  /** date */
  timestamp: Date;
  /** parent block hash */
  parentHash: string;
  /** block size */
  size: string;
  /** list of transactions */
  transactions: Transaction[];
}

export interface BlockCreationAttrs extends Omit<BlockAttrs, 'transactions'> {
  transactions: TransactionCreationAttrs[];
}

@Table({ tableName: 'blocks', timestamps: false })
export class Block
  extends Model<BlockAttrs, BlockCreationAttrs>
  implements BlockAttrs
{
  @Column({ type: DataType.INTEGER, primaryKey: true })
  number: number;

  @Column({ type: DataType.STRING, allowNull: false })
  hash: string;

  @Column({ type: DataType.STRING, allowNull: false })
  gasUsed: string;

  @Column({ type: DataType.DATE, allowNull: false })
  timestamp: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  parentHash: string;

  @Column({ type: DataType.STRING, allowNull: false })
  size: string;

  @HasMany(() => Transaction, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];
}
