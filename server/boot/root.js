'use strict';

module.exports = function(server) {
  var router = server.loopback.Router();
  router.get('/api', server.loopback.status());
  server.use(router);
};
