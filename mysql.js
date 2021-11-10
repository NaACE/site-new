const connections = require('mongoose');
const mysql = require('mysql');


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "db"
});


/* Костыль */
const sql = `TRUNCATE TABLE users`;

connection.query(sql, function (err, results) {
    if (err) console.log(err);
    //console.log(results);
    connection.end;
});

var sql1 = "INSERT INTO users(id, username, password) VALUES(1, 'test1', 'test1')";

connection.query(sql1, function (err, results) {
    if (err) console.log(err);
    //console.log(results);

    connection.end;
});

/* End Костыль*/


// 
module.exports = {
    sign_in: (user, callback) => {
        var connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "db"
        });

        connection.connect((err) => {
            if (err) {
                console.error("Ошибка: " + err.message);
            } else {
                var select = 'select *  from `users` where `username` = "' + user.user_name + '" and `password` = "' + user.password + '"';
                connection.query(select, (err, results, fields) => {
                    if (err) {
                        console.log(err);
                    } else {
                        callback(err, fields);
                    }
                })
            }
            connection.end();
        });
    },
    login: (user, callback) => { /// ! ДОБАВИТЬ ПРОВЕРКУ НА ПОВТОРЫ
        var connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "db"
        });

        connection.connect((err) => {
            if (err) {
                console.error("Ошибка: " + err.message);
            } else {
                var select = "INSERT INTO users(id, username, password) VALUES( 2, '" + user.user_name + "', '" + user.password + "' )";
                connection.query(select, function (err, results) {
                    if (err) { 
                        console.log(err);
                    } else {
                        callback(err);
                    }
                });
            }
            connection.end();
        });
    }
}