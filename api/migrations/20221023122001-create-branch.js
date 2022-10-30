'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('Branches', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID
          },
          name: {
            type: Sequelize.STRING
          },
          address: {
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
            allowNull: true,
            type: Sequelize.DATE
          }
        }, { transaction: t }),

        queryInterface.removeColumn('Invoices', 'store_id', { transaction: t }),
      ]);
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('Branches', { transaction: t }),
        queryInterface.addColumn('Invoices', 'store_id', {
          type: Sequelize.UUID,
          references: { model: 'Stores', key: 'id' }
        }, { transaction: t }),
      ]);
    });
  }
};