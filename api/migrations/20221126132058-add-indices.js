'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addIndex('branches', ['store_id'], { transaction: t }),
        queryInterface.addIndex('products', ['category_id'], { transaction: t }),
        queryInterface.addIndex('invoices', ['transaction_date'], { transaction: t }),
        queryInterface.addIndex('invoices', ['cashier_id'], { transaction: t }),
        queryInterface.addIndex('invoices', ['bagger_id'], { transaction: t }),
        queryInterface.addIndex('invoices', ['branch_id'], { transaction: t }),
        queryInterface.addIndex('invoiceItems', ['item_id'], { transaction: t }),
        queryInterface.addIndex('invoiceItems', ['invoice_id'], { transaction: t }),
        queryInterface.addIndex('items', ['sku'], { transaction: t }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeIndex('branches', ['store_id'], { transaction: t }),
        queryInterface.removeIndex('products', ['category_id'], { transaction: t }),
        queryInterface.removeIndex('invoices', ['transaction_date'], { transaction: t }),
        queryInterface.removeIndex('invoices', ['cashier_id'], { transaction: t }),
        queryInterface.removeIndex('invoices', ['bagger_id'], { transaction: t }),
        queryInterface.removeIndex('invoices', ['branch_id'], { transaction: t }),
        queryInterface.removeIndex('invoiceItems', ['item_id'], { transaction: t }),
        queryInterface.removeIndex('invoiceItems', ['invoice_id'], { transaction: t }),
        queryInterface.removeIndex('items', ['sku'], { transaction: t }),
      ]);
    });
  }
};
