const express = require('express');
const db = require('../models');
const router = express.Router();
const Item = db['Item'];
const Product = db['Product'];
const Price = db['Price'];

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })


// define the home page route
// router.get('/', (req, res) => {
//   res.send('Birds home page')
// })

// Handle requests to /api/products/sku/:sku
router.get('/sku/:sku', async (req, res) => {
    try {
        const result = await db.sequelize.transaction(async (t) => {
            // Get the item with its product and latest price
            const item = await Item.findOne({
                where: { sku: req.params.sku },
                include: [
                    Product,
                    {
                        model: Price,
                        separate: true,
                        limit: 1,
                        order: [
                            ['date_entered', 'DESC']
                        ],
                    }
                ]
            });

            // Return an empty object if the item is not found
            if (item === null) {
                console.log(`Product with SKU of ${req.params.sku} not found`);
                return {};
            } else {
                // Return the Item's product
                return item;
            }
        });

        if (result) {
            res.send(result);
        }
    } catch (error) {
        console.error('There was an error when retrieving product with sku: ', error);
    }
});

module.exports = router