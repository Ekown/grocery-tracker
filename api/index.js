require('dotenv').config();
const path = require('path');
const express = require('express');
const pg = require('pg');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 3001;

const app = express();

const Sequelize = require("sequelize-cockroachdb");
const connectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(connectionString, {
    dialectModule: pg,
    dialect: 'postgres',
});

// Try to connect to the CockroachDB instance
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports = app;