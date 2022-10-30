'use strict';

const { Op } = require('sequelize');
const {
  v4: uuidv4,
} = require('uuid');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // Create 3 uuids for the stores for branch reference
    let arStoreIds = new Array(3).fill(null).map(() => uuidv4());

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('Cashiers', [
          {
            id: uuidv4(),
            name: 'Test Cashier 1',
            date_entered: new Date(),
            date_modified: new Date()
          },
          {
            id: uuidv4(),
            name: 'Test Cashier 2',
            date_entered: new Date(),
            date_modified: new Date()
          },
          {
            id: uuidv4(),
            name: 'Test Cashier 3',
            date_entered: new Date(),
            date_modified: new Date()
          }
        ], { transaction: t }),

        queryInterface.bulkInsert('Baggers', [
          {
            id: uuidv4(),
            name: 'Test Bagger 1',
            date_entered: new Date(),
            date_modified: new Date()
          },
          {
            id: uuidv4(),
            name: 'Test Bagger 2',
            date_entered: new Date(),
            date_modified: new Date()
          },
          {
            id: uuidv4(),
            name: 'Test Bagger 3',
            date_entered: new Date(),
            date_modified: new Date()
          }
        ], { transaction: t }),

        queryInterface.bulkInsert('Stores', [
          {
            id: arStoreIds[0],
            name: 'Test Store 1',
            date_entered: new Date(),
            date_modified: new Date()
          },
          {
            id: arStoreIds[1],
            name: 'Test Store 2',
            date_entered: new Date(),
            date_modified: new Date()
          },
          {
            id: arStoreIds[2],
            name: 'Test Store 3',
            date_entered: new Date(),
            date_modified: new Date()
          }
        ], { transaction: t }),

        queryInterface.bulkInsert('Branches', [
          {
            id: uuidv4(),
            name: 'Test Branch for Store 1',
            store_id: arStoreIds[0],
            address: faker.address.streetAddress(true),
            date_entered: new Date(),
            date_modified: new Date()
          },
          {
            id: uuidv4(),
            name: 'Test Branch for Store 2',
            store_id: arStoreIds[1],
            address: faker.address.streetAddress(true),
            date_entered: new Date(),
            date_modified: new Date()
          },
          {
            id: uuidv4(),
            name: 'Test Branch for Store 3',
            store_id: arStoreIds[2],
            address: faker.address.streetAddress(true),
            date_entered: new Date(),
            date_modified: new Date()
          }
        ], { transaction: t }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkDelete('Cashiers', { [Op.or]: [{ name: 'Test Cashier 1' }, { name: 'Test Cashier 2' }, { name: 'Test Cashier 3' }] }, { transaction: t }),
        queryInterface.bulkDelete('Baggers', { [Op.or]: [{ name: 'Test Bagger 1' }, { name: 'Test Bagger 2' }, { name: 'Test Bagger 3' }] }, { transaction: t }),
        queryInterface.bulkDelete('Branches', { [Op.or]: [{ name: 'Test Branch for Store 1' }, { name: 'Test Branch for Store 2' }, { name: 'Test Branch for Store 3' }] }, { transaction: t }),
        queryInterface.bulkDelete('Stores', { [Op.or]: [{ name: 'Test Store 1' }, { name: 'Test Store 2' }, { name: 'Test Store 3' }] }, { transaction: t }),
      ]);
    });
  }
};
