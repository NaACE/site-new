const connections = require('mongoose');
const mysql = require('mysql');


module.exports = {
    sign_in: (user, callback) => {
        var db = new DB('select *  from `users` where `username` = "' + user.user_name + '" and `password` = "' + user.password + '"');
        callback(db.run()); // db.run()
    },
    login: (user, callback) => { /// ! ДОБАВИТЬ ПРОВЕРКУ НА ПОВТОРЫ
        var db = new DB("INSERT INTO users(id, username, password) VALUES( 2, '" + user.user_name + "', '" + user.password + "' )");
        callback(db.run()); // db.run()
    }
}


class DB {
    constructor(select) {
        this.select = select;
        this.test();
    }

    test() {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'db'
        });
        var sql = 'TRUNCATE TABLE users';

        connection.query(sql, function (err, results) {
            if (err) console.log(err);
            connection.end;
        });

        var sql1 = `INSERT INTO users(id, username, password) VALUES(1, 'test1', 'test1')`;

        connection.query(sql1, function (err, results) {
            if (err) console.log(err);
            connection.end;
        });
    }

    run() {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'db'
        });

        connection.connect((err) => {
            if (err) {
                console.error('Ошибка: ' + err.message);
            } else {
                connection.query(this.select, function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        return results;
                    }
                });
            }
            connection.end();
        });
    }
}