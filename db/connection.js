const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '7Rdcmnse.',
        database: 'employees'
    },
    console.log('connected to the employees database.')
);

module.exports = db;