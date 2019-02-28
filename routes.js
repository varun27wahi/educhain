const routes = require('next-routes')();

routes
  .add('/issuers/:address/certificates/view', '/issuers/certificates/view')
  .add('/issuers/:address/certificates/new', '/issuers/certificates/new');

module.exports = routes;
