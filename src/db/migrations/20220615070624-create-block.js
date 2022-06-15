'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blocks', {
      number: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gasUsed: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      parentHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blocks');
  },
};
