'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      hash: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      value: {
        type: Sequelize.DECIMAL({ precision: 30 }),
        allowNull: false,
      },
      gas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gasPrice: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transactionIndex: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blockNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'blocks',
          key: 'number',
        },
      },
      fromAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'wallets',
          key: 'address',
        },
      },
      toAddress: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'wallets',
          key: 'address',
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  },
};
