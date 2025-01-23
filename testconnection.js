const mysql = require('mysql');
require('dotenv').config();

console.log('Testing database connection with the following details:');
console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ? '******' : '(empty)',
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
});

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
});

connection.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Database connected successfully!');
    }
    connection.end();
});
