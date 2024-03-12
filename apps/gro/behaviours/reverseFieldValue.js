module.exports = config => superclass => class extends superclass {
    saveValues(req, res, next) {
      req.form.values[`${config.key}-reversed`] = reverse(req.form.values[config.key]);
      super.saveValues(req, res, next);
    }
  };