// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  const appRoutes = require('../routes/purchase.routes')(router,server);
  router.get('/', function(req, res) {
    res.render('index', {
      loginFailed: false
    });
  });
  router.get('/ticket', function(req, res) {
    res.render('./ticket');
  });
  router.get('/employee', function(req, res) {
    res.render('./employee');
  });
  router.get('/login', function(req, res) {
    res.render('./login');
  });
  router.get('/mobile/login', function(req, res) {
    res.render('./mobile/login');
  });
  router.get('/vendor', function(req, res) {
    res.render('./vendor');
  });
  router.get('/purchase-history', function(req, res) {
    res.render('./purchase-history');
  });
  router.get('/purchase-request', function(req, res) {
    res.render('./purchase-request');
  });
  router.get('/mytest', function(req, res) {
    res.render('./mytest');
  });
  router.get('/preview', function(req, res) {
    res.render('./preview');
  });
  router.get('/product', function(req, res) {
    res.render('./product');
  });
  server.use(router);
};
