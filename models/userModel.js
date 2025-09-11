const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8j97d32sY_',
    database: 'db_clinica'
});

db.connect();

module.exports = {
    findUser: (username, password, callback) => {
        db.query(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password],
            (err, results) => {
                if (err) throw err;
                callback(results);
            }
        );
    }
};