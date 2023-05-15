var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '27092002',
    database: 'elife'
});

connection.connect(function(err) {
    if (err) {
        console.log("Connect database error: " + err);
    }
    console.log('connected as id'+ connection.threadId);
});

module.exports = connection;