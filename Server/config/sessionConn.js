const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);
require('dotenv').config({ path: ".env" });

const sessionStore = new MysqlStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const SessionOption = {
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized: false,
    store : sessionStore
}

const Session = session(SessionOption);

module.exports = Session;