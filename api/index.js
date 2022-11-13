require('dotenv').config();
const path = require('path');
const express = require('express');
const pg = require('pg');
const { exit } = require('process');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 3001;

const app = express();

const db = require('./models');
const cashiers = require('./routers/cashiers');
const baggers = require('./routers/baggers');
const stores = require('./routers/stores');

// Try to connect to the CockroachDB instance
(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        exit();
    }
})();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Allow CORS Header
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.json({ message: "Hello from server!" });
});

// Use cashiers router
app.use('/api/cashiers', cashiers);

// Use baggers router
app.use('/api/baggers', baggers);

// Use stores router
app.use('/api/stores', stores);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports = app;