'use strict';

var express = require('express');
var app = express();
var path = require('path');
var logger = require('./lib/logger');
var churchill = require('churchill');
var session = require('express-session');
var redis = require('redis');
var config = require('./config');
require('moment-business');

if (config.env === 'ci') {
  app.use(require('./ci.js'));
} else {
  app.use(churchill(logger));
}

if (config.env === 'development' || config.env === 'docker' || config.env === 'ci') {
  app.use('/public', express.static(path.resolve(__dirname, './public')));
}

app.use(function injectLocals(req, res, next) {
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

app.use(function setBaseUrl(req, res, next) {
  res.locals.baseUrl = req.baseUrl;
  next();
});

/*************************************/
/******* Redis session storage *******/
/*************************************/
var RedisStore = require('connect-redis-crypto')(session);
var client = redis.createClient(config.redis.port, config.redis.host);

client.on('error', function clientErrorHandler(e) {
  throw e;
});

var redisStore = new RedisStore({
  client: client,
  ttl: config.session.ttl,
  secret: config.session.secret
});

function secureCookies(req, res, next) {
  var cookie = res.cookie.bind(res);
  res.cookie = function cookieHandler(name, value, options) {
    options = options || {};
    options.secure = (req.protocol === 'https');
    options.httpOnly = true;
    options.path = '/';
    cookie(name, value, options);
  };
  next();
}

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

app.get('/cookies', function renderCookies(req, res) {
  res.render('cookies');
});
app.get('/terms-and-conditions', function renderTerms(req, res) {
  res.render('terms');
});

app.get('/healthz/ping', (req, res) => res.send(200));

// errors
app.use(require('hof').middleware.errors({
  logger: require('./lib/logger'),
  translate: require('hof').i18n.translate,
  debug: config.env === 'development'
}));

/*eslint camelcase: 0*/
app.listen(config.port, config.listen_host);
/*eslint camelcase: 1*/
logger.info('App listening on port', config.port);
