var mysql = require("mysql");
//Database connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'AppVictoriousSecrets'
});
connection.connect(function (error) {
    if (error) throw error;
});

module.exports = connection;