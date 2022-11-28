'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('items', 'image_url', {
          type: Sequelize.STRING,
        }, { transaction: t }),
        queryInterface.addIndex('items', ['image_url'], { transaction: t }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('items', 'image_url', { transaction: t }),
        queryInterface.removeIndex('items', ['image_url'], { transaction: t }),
      ]);
    });
  }
};
