'use strict';

const express = require('express');
const app = express();
const path = require('path');
const logger = require('./lib/logger');
const churchill = require('churchill');
const session = require('express-session');
const redis = require('redis');
const config = require('./config');
const i18n = require('hof').i18n({
  path: path.resolve(__dirname, './apps/common/translations/__lng__/__ns__.json')
});

if (config.env === 'ci') {
  app.use(require('./ci.js'));
} else {
  app.use(churchill(logger));
}

if (config.env === 'development' || config.env === 'ci') {
  app.use('/public', express.static(path.resolve(__dirname, './public')));
}

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

app.use((req, res, next) => {
  res.locals.baseUrl = req.baseUrl;
  next();
});

// Redis session storage
const RedisStore = require('connect-redis-crypto')(session);
const client = redis.createClient(config.redis.port, config.redis.host);

client.on('error', e => {
  throw e;
});

const redisStore = new RedisStore({
  client,
  ttl: config.session.ttl,
  secret: config.session.secret
});

function secureCookies(req, res, next) {
  const cookie = res.cookie.bind(res);
  res.cookie = (name, value, options) => {
    options = options || {};
    options.secure = req.protocol === 'https';
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
    secure: !(config.env === 'development' || config.env === 'docker-compose' || config.env === 'ci')
  },
  key: 'hmgro.sid',
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true
}));

// check for cookies
app.use(require('hof').middleware.cookies());

// apps
app.use(require('./apps/gro/'));

app.get('/cookies', (req, res) => res.render('cookies'));
app.get('/terms-and-conditions', (req, res) => res.render('terms'));

// shallow health check
app.get('/healthz/ping', (req, res) => res.send(200));

// 404's
app.use(require('hof').middleware.notFound({
  logger: require('./lib/logger'),
  translate: i18n.translate.bind(i18n),
}));

// errors
app.use(require('hof').middleware.errors({
  logger: require('./lib/logger'),
  translate: i18n.translate.bind(i18n)
}));

// eslint-disable-next-line camelcase
app.listen(config.port, config.listen_host);
logger.info('App listening on port', config.port);
