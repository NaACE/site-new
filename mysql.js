const mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "db"
});

// Проверка на работу сервера
connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    } else {
        //console.log("Подключение к серверу MySQL успешно установлено");
    }
    connection.end();
});

// 
module.exports = {
    sign_in: (user, callback) => {
        connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "db"
        });
        connection.connect((err) => {
            if (err) {
                console.error("Ошибка: " + err.message);
                connection.end();
            }

            var select = 'SELECT * FROM `users` WHERE `username` = "' + user.user_name + '" and `password` = "' + user.password + '";';
            connection.query(select, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    //let object = { username: results[0].username, password: results[0].password };
                    //let json = JSON.stringify( results[0] );
                    //console.log(json)
                    callback(err, results[0]);
                }
            })
            connection.end();
        });
    },
    //registration(user, callback) => { }
}

/*const sql = `INSERT INTO users(id, username, password) VALUES(1, 'test1', 'test1')`;

connection.query(sql, function (err, results) {
    if (err) console.log(err);
    console.log(results);
});


const select = `SELECT * FROM users`;
 
connection.query(select, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});*/