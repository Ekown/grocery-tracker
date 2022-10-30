'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.renameTable('Baggers', 'baggers', { transaction: t }),
        queryInterface.renameTable('Branches', 'branches', { transaction: t }),
        queryInterface.renameTable('Cashiers', 'cashiers', { transaction: t }),
        queryInterface.renameTable('Categories', 'categories', { transaction: t }),
        queryInterface.renameTable('Items', 'items', { transaction: t }),
        queryInterface.renameTable('Invoices', 'invoices', { transaction: t }),
        queryInterface.renameTable('InvoiceItems', 'invoiceItems', { transaction: t }),
        queryInterface.renameTable('Products', 'products', { transaction: t }),
        queryInterface.renameTable('Stores', 'stores', { transaction: t }),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.renameTable('baggers', 'Baggers', { transaction: t }),
        queryInterface.renameTable('branches', 'Branches', { transaction: t }),
        queryInterface.renameTable('cashiers', 'Cashiers', { transaction: t }),
        queryInterface.renameTable('categories', 'Categories', { transaction: t }),
        queryInterface.renameTable('items', 'Items', { transaction: t }),
        queryInterface.renameTable('invoices', 'Invoices', { transaction: t }),
        queryInterface.renameTable('invoiceItems', 'InvoiceItems', { transaction: t }),
        queryInterface.renameTable('products', 'Products', { transaction: t }),
        queryInterface.renameTable('stores', 'Stores', { transaction: t }),
      ]);
    });
  }
};
