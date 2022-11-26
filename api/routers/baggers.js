const express = require('express');
const db = require('../models');
const router = express.Router();
const Bagger = db['Bagger'];

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })


// define the home page route
// router.get('/', (req, res) => {
//   res.send('Birds home page')
// })

// Handle requests to /api/baggers/list
router.get('/list', async (req, res) => {
    try {
        const result = await db.sequelize.transaction(async (t) => {
            const baggers = await Bagger.findAll({
                order: [['name', 'ASC']],
            });

            return baggers;
        });

        if (result) {
            res.send(result);
        }
    } catch (error) {
        console.error('There was an error when retrieving all baggers: ', error);
    }
})

module.exports = router