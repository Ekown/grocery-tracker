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

    await queryInterface.addColumn('Products', 'category_id', {
      type: Sequelize.UUID,
      references: { model: 'Categories', key: 'id' }
    });

    await queryInterface.addColumn('Items', 'product_id', {
      type: Sequelize.UUID,
      references: { model: 'Products', key: 'id' }
    });

    await queryInterface.addColumn('InvoiceItems', 'item_id', {
      type: Sequelize.UUID,
      references: { model: 'Items', key: 'id' }
    });

    await queryInterface.addColumn('InvoiceItems', 'invoice_id', {
      type: Sequelize.UUID,
      references: { model: 'Invoices', key: 'id' }
    });

    await queryInterface.addColumn('Invoices', 'cashier_id', {
      type: Sequelize.UUID,
      references: { model: 'Cashiers', key: 'id' }
    });

    await queryInterface.addColumn('Invoices', 'bagger_id', {
      type: Sequelize.UUID,
      references: { model: 'Baggers', key: 'id' }
    });

    await queryInterface.addColumn('Invoices', 'store_id', {
      type: Sequelize.UUID,
      references: { model: 'Stores', key: 'id' }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Products', 'category_id');
    await queryInterface.removeColumn('Items', 'product_id');
    await queryInterface.removeColumn('InvoiceItems', 'item_id');
    await queryInterface.removeColumn('InvoiceItems', 'invoice_id');
    await queryInterface.removeColumn('Invoices', 'cashier_id');
    await queryInterface.removeColumn('Invoices', 'bagger_id');
    await queryInterface.removeColumn('Invoices', 'store_id');
  }
};
