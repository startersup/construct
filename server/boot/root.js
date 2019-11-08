// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  const purchaseRoutes = require('../routes/purchase.routes')(router,server);
  const mobileRoutes = require('../routes/mobile.routes')(router,server);
  const adminRoutes = require('../routes/admin.routes')(router,server);
  const requestRoutes = require('../routes/requests.routes')(router,server);
  const inventoryRoutes = require('../routes/inventory.routes')(router,server);
  router.get('/', function(req, res) {
    res.render('./index');
  });
  router.get('/mytest', function(req, res) {
    res.render('./mytest');
  });
  server.use(router);
};
