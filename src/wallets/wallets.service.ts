import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from 'src/db/models';

export type WalletWithMaxChage = {
  address: string;
  total: string;
  totalABS: string;
};

@Injectable()
export class WalletsService {
  constructor(@InjectModel(Wallet) private walletRepository: typeof Wallet) {}

  async getWalletById(address: string) {
    return await this.walletRepository.findByPk(address, {
      include: { all: true, nested: true },
    });
  }

  async create(address: string) {
    await this.walletRepository.findOrCreate({
      where: { address },
    });
  }

  async createMany(addresses: string[]) {
    const uniqueAddresses = Array.from(new Set(addresses));

    await Promise.all(uniqueAddresses.map((address) => this.create(address)));
  }

  async getWalletWithMaxChange(): Promise<WalletWithMaxChage> {
    // написал кастомный запрос чтобы показать что умею работать с SQL запросами и в принципе так проще реализовать задачу
    return (
      await this.walletRepository.sequelize.query(`
    SELECT
        s.address,
        (-sent + received) AS total,
        ABS(-sent + received) AS "totalABS"
    FROM (
        SELECT address, SUM(value) as sent
        FROM (
            SELECT * FROM blocks
            ORDER BY number DESC
            LIMIT 100) AS lb
            INNER JOIN (
              SELECT * FROM transactions
              WHERE value <> 0
            ) AS tr ON tr."blockNumber" = lb.number
            INNER JOIN wallets ON tr."fromAddress" = wallets.address
            GROUP BY address
        ) AS s
        INNER JOIN (
          SELECT address, SUM(value) as received
          FROM (
            SELECT * FROM blocks
            ORDER BY number DESC
            LIMIT 100) AS lb
            INNER JOIN (
              SELECT * FROM transactions
              WHERE value <> 0
            ) AS tr ON tr."blockNumber" = lb.number
            INNER JOIN wallets ON tr."toAddress" = wallets.address
          GROUP BY address
        ) AS r ON r.address = s.address
    ORDER BY "totalABS" DESC
    LIMIT 1;
    `)
    )[0][0] as WalletWithMaxChage;
  }
}
