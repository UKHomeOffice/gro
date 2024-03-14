'use strict';
module.exports = superclass => class extends superclass {
    locals(req, res, next) {
      const superLocals = super.locals(req, res, next);
      console.log(req.sessionModel.get('email-text'));
      if (req.sessionModel.get('email-text') !== undefined) {
        superLocals.fields[0]['email-text'] = req.sessionModel.get('email-text');
      }
      return super.locals(req, res, next);
    }
  };
