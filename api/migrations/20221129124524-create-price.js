'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('prices', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID
          },
          unit_price: {
            type: Sequelize.DECIMAL(10,2)
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
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('prices', { transaction: t }),
      ]);
    });
  }
};
