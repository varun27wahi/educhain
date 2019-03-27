const routes = require('next-routes')();

routes
  .add('/issuers/:address/certificates/view', '/issuers/certificates/view')
  .add('/issuers/:address/certificates/new', '/issuers/certificates/new')
  .add('/issuers/:address/certificates/verify/:id', '/issuers/certificates/verify');

module.exports = routes;
