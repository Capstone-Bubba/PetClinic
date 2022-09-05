const express = require('express');
const path = require('path');
const passport = require('passport');
const passportConfig = require('./passport/passportConfig');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const Session = require('./config/sessionConn');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const detectRouter = require('./routes/detect')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin: true}));

app.use(Session);

passportConfig();

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/detect', detectRouter);

module.exports = app;
