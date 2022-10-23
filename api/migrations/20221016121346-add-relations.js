'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Products', 'category_id', {
          type: Sequelize.UUID,
          references: { model: 'Categories', key: 'id' }
        }, { transaction: t }),

        queryInterface.addColumn('Items', 'product_id', {
          type: Sequelize.UUID,
          references: { model: 'Products', key: 'id' }
        }, { transaction: t }),

        queryInterface.addColumn('InvoiceItems', 'item_id', {
          type: Sequelize.UUID,
          references: { model: 'Items', key: 'id' }
        }, { transaction: t }),

        queryInterface.addColumn('InvoiceItems', 'invoice_id', {
          type: Sequelize.UUID,
          references: { model: 'Invoices', key: 'id' }
        }, { transaction: t }),

        queryInterface.addColumn('Invoices', 'cashier_id', {
          type: Sequelize.UUID,
          references: { model: 'Cashiers', key: 'id' }
        }, { transaction: t }),

        queryInterface.addColumn('Invoices', 'bagger_id', {
          type: Sequelize.UUID,
          references: { model: 'Baggers', key: 'id' }
        }, { transaction: t }),

        queryInterface.addColumn('Invoices', 'store_id', {
          type: Sequelize.UUID,
          references: { model: 'Stores', key: 'id' }
        }, { transaction: t }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Products', 'category_id', { transaction: t }),
        queryInterface.removeColumn('Items', 'product_id', { transaction: t }),
        queryInterface.removeColumn('InvoiceItems', 'item_id', { transaction: t }),
        queryInterface.removeColumn('InvoiceItems', 'invoice_id', { transaction: t }),
        queryInterface.removeColumn('Invoices', 'cashier_id', { transaction: t }),
        queryInterface.removeColumn('Invoices', 'bagger_id', { transaction: t }),
        queryInterface.removeColumn('Invoices', 'store_id', { transaction: t }),
      ]);
    });
  }
};
