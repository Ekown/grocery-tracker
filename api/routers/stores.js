const express = require('express');
const db = require('../models');
const router = express.Router()

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
            const stores = await db['Store'].findAll({
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
})

module.exports = router