'use strict';

const { Op } = require('sequelize');
const { faker } = require('@faker-js/faker');
const { generateMockSeedArrays } = require('../utils/helpers');

const arCashiers = generateMockSeedArrays(10, 'Test Cashier');
const arBaggers = generateMockSeedArrays(10, 'Test Bagger');
const arStores = generateMockSeedArrays(10, 'Test Store');
const arBranches = generateMockSeedArrays(10, 'Test Branch for Store', (i) => {
  return {
    store_id: arStores[i].id,
    address: faker.address.streetAddress(true),
  }
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('cashiers', [
          ...arCashiers,
        ], { transaction: t }),

        queryInterface.bulkInsert('baggers', [
          ...arBaggers,
        ], { transaction: t }),

        queryInterface.bulkInsert('stores', [
          ...arStores,
        ], { transaction: t }),

        queryInterface.bulkInsert('branches', [
          ...arBranches,
        ], { transaction: t }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkDelete('cashiers', { [Op.or]: [...arCashiers.map(a => { return { name: a.name } })] }, { transaction: t }),
        queryInterface.bulkDelete('baggers', { [Op.or]: [...arBaggers.map(a => { return { name: a.name } })] }, { transaction: t }),
        queryInterface.bulkDelete('branches', { [Op.or]: [...arBranches.map(a => { return { name: a.name } })] }, { transaction: t }),
        queryInterface.bulkDelete('stores', { [Op.or]: [...arStores.map(a => { return { name: a.name } })] }, { transaction: t }),
      ]);
    });
  }
};
