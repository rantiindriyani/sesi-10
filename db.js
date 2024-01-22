const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', //sesuaikan dengna username mysql masing-masing 
    password: '', //sesuaikan dengan password mysql masing-masing
    database: 'mahasiswa',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    } 
});

    module.exports = connection;