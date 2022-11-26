'use strict';

const { Op } = require('sequelize');
const { generateMockSeedArrays } = require('../utils/helpers');

let arCategories = generateMockSeedArrays(5);
const testData = {
  categories: [
    {
      name: 'Vitamins and Supplements',
    },
    {
      name: 'Hair, Skin & Nail Tools',
    },
    {
      name: 'Deodorant & Anti-Perspirant',
    },
    {
      name: 'Cotton & Tissue',
    },
    {
      name: 'Aromatherapy and Home Fragrance',
    },
  ],
  products: [
    {
      name: 'Enervon Multivitamins Tablet'
    },
    {
      name: 'Gillette Rubie 2 Razor',
    },
    {
      name: 'AXE Black Deodorant Body Spray',
    },
    {
      name: 'Reach Cotton Balls 150+20 Pcs Free',
    },
    {
      name: 'Zen Zest Water Based Oil - Forest Bamboo',
    },
  ],
  items: [
    {
      sku: 4807788410016,
      size: '30s',
    },
    {
      sku: 4902430441896,
      size: '1s',
    },
    {
      sku: 8851932349130,
      size: '50mL',
    },
    {
      sku: 6952286100711,
      size: '150+20s',
    },
    {
      sku: 4809012857680,
      size: '100mL',
    },
  ],
};

arCategories = arCategories.map((x, i) => { return { ...x, ...testData.categories[i] } });

let arProducts = generateMockSeedArrays(5, null, i => {
  return {
    category_id: arCategories[i].id,
  }
});
let arItems = generateMockSeedArrays(5, null, i => {
  return {
    product_id: arProducts[i].id,
  }
});

arProducts = arProducts.map((x, i) => { return { ...x, ...testData.products[i] } });
arItems = arItems.map((x, i) => { return { ...x, ...testData.items[i] } });

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('categories', [
          ...arCategories,
        ], { transaction: t }),

        queryInterface.bulkInsert('products', [
          ...arProducts,
        ], { transaction: t }),

        queryInterface.bulkInsert('items', [
          ...arItems,
        ], { transaction: t }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkDelete('items', { [Op.or]: [...arItems.map(a => { return { sku: a.sku } })] }, { transaction: t }),
        queryInterface.bulkDelete('products', { [Op.or]: [...arProducts.map(a => { return { name: a.name } })] }, { transaction: t }),
        queryInterface.bulkDelete('categories', { [Op.or]: [...arCategories.map(a => { return { name: a.name } })] }, { transaction: t }),        
      ]);
    });
  }
};
