// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const express = require("express");
const app = module.exports = loopback();
const bodyParser = require('body-parser');
const path = require('path');
const userAuth = require('./middleware/user-auth');
const cookieParser = require('cookie-parser');
app.middleware('initial', bodyParser.urlencoded({ extended: true }));

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});


app.set('view engine', 'ejs'); 
app.set('json spaces', 2); // format json responses for easier viewing


app.use(cookieParser('12345'));
app.set('views', path.resolve(__dirname, 'views'));
app.use('/assets',express.static(path.resolve(__dirname, 'assets')));
app.use('/js',express.static(path.resolve(__dirname, '../client')))
app.use(loopback.token({  
  model: app.models.accessToken,
  currentUserLiteral: 'me',
  searchDefaultTokenKeys: false,
  cookies: ['access_token'],
  headers: ['access_token', 'X-Access-Token'],
  params: ['access_token']
}));
app.use(/\/((?!login|assets|explorer|api).)*/, userAuth);
//|mobile\/login
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};


