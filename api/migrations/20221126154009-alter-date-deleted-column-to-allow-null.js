'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('products', 'date_deleted', {
          type: Sequelize.DATE,
          allowNull: true
        }, { transaction: t }),
        queryInterface.changeColumn('categories', 'date_deleted', {
          type: Sequelize.DATE,
          allowNull: true
        }, { transaction: t }),
        queryInterface.changeColumn('items', 'date_deleted', {
          type: Sequelize.DATE,
          allowNull: true
        }, { transaction: t }),
        queryInterface.changeColumn('invoiceItems', 'date_deleted', {
          type: Sequelize.DATE,
          allowNull: true
        }, { transaction: t }),
      ])
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('products', 'date_deleted', {
          type: Sequelize.DATE,
          allowNull: false
        }, { transaction: t }),
        queryInterface.changeColumn('categories', 'date_deleted', {
          type: Sequelize.DATE,
          allowNull: false
        }, { transaction: t }),
        queryInterface.changeColumn('items', 'date_deleted', {
          type: Sequelize.DATE,
          allowNull: false
        }, { transaction: t }),
        queryInterface.changeColumn('invoiceItems', 'date_deleted', {
          type: Sequelize.DATE,
          allowNull: false
        }, { transaction: t }),
      ]);
    });
  }
};
