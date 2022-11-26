const express = require('express');
const db = require('../models');
const router = express.Router();
const Item = db['Item'];
const Product = db['Product'];

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
            const item = await Item.findOne({ where: { sku: req.params.sku } });

            // Return an empty array if the store is not found
            if (item === null) {
                console.log(`Product with SKU of ${req.params.sku} not found`);
                return null;
            } else {
                // Return all the branches of the store
                return item.getProduct();
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