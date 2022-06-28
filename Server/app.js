const express = require('express');
const path = require('path');
const passport = require('passport');
const passportConfig = require('./passport/passportConfig');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const Session = require('./config/sessionConn');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(Session);

passportConfig();

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authRouter);

module.exports = app;
