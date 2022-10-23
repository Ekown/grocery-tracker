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
        queryInterface.addColumn('Invoices', 'branch_id', {
          type: Sequelize.UUID,
          references: { model: 'Branches', key: 'id' }
        }, { transaction: t }),

        queryInterface.addColumn('Branches', 'store_id', {
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
        queryInterface.removeColumn('Invoices', 'branch_id', { transaction: t }),
        queryInterface.removeColumn('Branches', 'store_id', { transaction: t }),
      ]);
    });
  }
};
