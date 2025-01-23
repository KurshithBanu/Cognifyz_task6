const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306
});

connection.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); // Exit the process on failure
    }
    console.log('Connected to the database successfully!');
});

module.exports = connection;
