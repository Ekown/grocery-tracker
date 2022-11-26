const express = require('express');
const db = require('../models');
const router = express.Router()
const Store = db['Store'];

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })


// define the home page route
// router.get('/', (req, res) => {
//   res.send('Birds home page')
// })

// Handle requests to /api/stores/list
router.get('/list', async (req, res) => {
    try {
        const result = await db.sequelize.transaction(async (t) => {
            const stores = await Store.findAll({
                order: [['name', 'ASC']],
            });

            return stores;
        });

        if (result) {
            res.send(result);
        }
    } catch (error) {
        console.error('There was an error when retrieving all stores: ', error);
    }
});

// Handle requests to /api/stores/:storeId/branch
router.get('/:storeId/branch', async (req, res) => {
    try {
        const result = await db.sequelize.transaction(async (t) => {
            const store = await Store.findByPk(req.params.storeId);

            // Return an empty array if the store is not found
            if (store === null) {
                console.log(`Store ${req.params.storeId} not found`);
                return [];
            } else {
                // Return all the branches of the store
                return branches = store.getBranches();
            }
        });

        if (result) {
            res.send(result);
        }
    } catch (error) {
        console.error('There was an error when retrieving store branches: ', error);
    }
});

module.exports = router