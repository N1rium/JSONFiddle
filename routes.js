//const auth = require('./authenticate');
const jsonRouter = require('./api/controllers/json/router');

module.exports = function(app) {
  app.use('/api/v1/json', jsonRouter);
};
