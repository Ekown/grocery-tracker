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

// Handle requests to /api/cashiers/list
router.get('/list', async (req, res) => {
    try {
        const result = await db.sequelize.transaction(async (t) => {
            const cashiers = await db['Cashier'].findAll({
                order: [['name', 'ASC']],
            });

            return cashiers;
        });

        if (result) {
            res.send(result);
        }
    } catch (error) {
        console.error('There was an error when retrieving all cashiers: ', error);
    }
})

module.exports = router