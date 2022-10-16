'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      sku: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      size: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date_entered: {
        allowNull: false,
        type: Sequelize.DATE
      },
      date_modified: {
        allowNull: false,
        type: Sequelize.DATE
      },
      date_deleted: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  }
};