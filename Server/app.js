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
const detectRouter = require('./routes/detect');
const petRouter = require('./routes/pet');

app.use(express.json());
app.use(express.urlencoded({ extended: false , limit: '50mb'}));
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
app.use('/main', petRouter)

module.exports = app;
