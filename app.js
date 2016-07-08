'use strict';

const hof = require('hof');
const express = require('express');
const path = require('path');
const logger = require('./lib/logger');
const churchill = require('churchill');
const session = require('express-session');
const config = require('./config');
const mockAPI = require('./ci.js');
const expressPartialTemplates = require('express-partial-templates');
const hoganExpressStrict = require('hogan-express-strict');
const bodyParser = require('body-parser');
const connectRedisCrypto = require('connect-redis-crypto');
const cookieParser = require('cookie-parser');
const gro = require('./apps/gro/');
let sessionStore;
const i18n = hof.i18n({
  path: path.resolve(__dirname, './apps/common/translations/__lng__/__ns__.json')
});

i18n.on('ready', () => {
  const app = express();

  if (config.env === 'ci') {
    app.use(mockAPI);
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

  hof.template.setup(app);
  app.set('view engine', 'html');
  app.set('views', path.resolve(__dirname, './apps/common/views'));
  app.enable('view cache');
  app.use(expressPartialTemplates(app));
  app.engine('html', hoganExpressStrict);

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.locals.baseUrl = req.baseUrl;
    next();
  });

  // Trust proxy for secure cookies
  app.set('trust proxy', 1);

  if (config.env !== 'ci') {
    // Redis session storage
    const redis = require('redis');
    const RedisStore = connectRedisCrypto(session);
    const client = redis.createClient(config.redis.port, config.redis.host);

    client.on('connecting', () => {
      logger.info('Connecting to redis');
    });

    client.on('connect', () => {
      logger.info('Connected to redis');
    });

    client.on('reconnecting', () => {
      logger.info('Reconnecting to redis');
    });

    client.on('error', (e) => {
      logger.error(e);
    });

    sessionStore = new RedisStore({
      client,
      ttl: config.session.ttl,
      secret: config.session.secret
    });
  }

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

  app.use(cookieParser(config.session.secret));
  app.use(secureCookies);

  const sessionOpts = Object.assign({
    store: sessionStore,
    name: config.session.name,
    cookie: {secure: config.protocol === 'https'},
    secret: config.session.secret,
    saveUninitialized: true,
    resave: true
  }, config.session);

  app.use(session(sessionOpts));

  // check for cookies
  app.use(hof.middleware.cookies());

  // apps
  app.use(gro);

  app.get('/cookies', (req, res) => res.render('cookies'));
  app.get('/terms-and-conditions', (req, res) => res.render('terms'));

  // shallow health check
  app.get('/healthz/ping', (req, res) => res.send(200));

  // 404's
  app.use(hof.middleware.notFound({
    logger,
    translate: i18n.translate.bind(i18n),
  }));

  // errors
  app.use(hof.middleware.errors({
    logger,
    translate: i18n.translate.bind(i18n)
  }));

  // eslint-disable-next-line camelcase
  app.listen(config.port, config.listen_host);
  logger.info('App listening on port', config.port);
});
