'use strict';

const express = require('express');
const app = express();
const path = require('path');
const logger = require('./lib/logger');
const churchill = require('churchill');
const session = require('express-session');
const redis = require('redis');
const config = require('./config');
require('moment-business');

if (config.env !== 'ci') {
  app.use(churchill(logger));
}

if (config.env === 'development' || config.env === 'docker' || config.env === 'ci') {
  app.use('/public', express.static(path.resolve(__dirname, './public')));
}

// inject locals
app.use((req, res, next) => {
  req.baseUrl = config.siteroot + req.baseUrl;
  res.locals.assetPath = config.siteroot + '/public';
  res.locals.gaTagId = config.ga.tagId;
  next();
});

require('hof').template.setup(app);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './apps/common/views'));
app.enable('view cache');
app.use(require('express-partial-templates')(app));
app.engine('html', require('hogan-express-strict'));

app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());

// set baseUrl
app.use((req, res, next) => {
  res.locals.baseUrl = req.baseUrl;
  next();
});

/*************************************/
/******* Redis session storage *******/
/*************************************/
var RedisStore = require('connect-redis-crypto')(session);
var client = redis.createClient(config.redis.port, config.redis.host);

// throw error
client.on('error', e => {
  throw e;
});

const redisStore = new RedisStore({
  client: client,
  ttl: config.session.ttl,
  secret: config.session.secret
});

const secureCookies = (req, res, next) => {
  var cookie = res.cookie.bind(res);
  res.cookie = (name, value, options) => {
    options = options || {};
    options.secure = (req.protocol === 'https');
    options.httpOnly = true;
    options.path = '/';
    cookie(name, value, options);
  };
  next();
};

app.use(require('cookie-parser')(config.session.secret));
app.use(secureCookies);
app.use(session({
  store: redisStore,
  cookie: {
    secure: (config.env === 'development' || config.env === 'docker' || config.env === 'ci') ? false : true
  },
  key: 'hmgro.sid',
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true
}));

// apps
app.use(require('./apps/gro/'));

app.get('/cookies', (req, res) => {
  res.render('cookies');
});
app.get('/terms-and-conditions', (req, res) => {
  res.render('terms');
});

// errors
app.use(require('./errors/'));


/*eslint camelcase: 0*/
app.listen(config.port, config.listen_host);
/*eslint camelcase: 1*/
logger.info('App listening on port', config.port);
