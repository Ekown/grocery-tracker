'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('prices', 'item_id', {
          type: Sequelize.UUID,
          references: { model: 'items', key: 'id' }
        }, { transaction: t }),

        queryInterface.addIndex('prices', ['item_id'], { transaction: t }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('prices', 'item_id', { transaction: t }),
        queryInterface.removeIndex('prices', ['item_id'], { transaction: t }),
      ]);
    });
  }
};
