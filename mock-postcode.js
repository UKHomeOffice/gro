'use strict';

module.exports = (req, res, next) => {
  if (req.path !== '/api/postcode-test') {
    return next();
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200);

  if (req.query.postcode === 'CR0 2EU') {
    // eslint-disable-next-line camelcase
    return res.send(JSON.stringify([{formatted_address: '49 Sydenham Road\nCroydon\nCR0 2EU', postcode: 'CR0 2EU'}]));
  }

  return res.send(JSON.stringify([]));
};
