(function() {
  'use strict';
 
  var express = require('express');
  var path = require('path');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

 
  var routes = require('./../server/routes/requests');
 
  var app = express();
 
  // view engine setup
  app.set('views', path.join(__dirname, './'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
 
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
 
  app.use(express.static(path.join(__dirname, './')));
 
  app.use('/', routes);
 
  app.set('port', process.env.PORT || 3000);
 
app.all('*', function (req, res) { res.status(200).sendFile(path.join(__dirname, './index.html')); });

  // var server = app.listen(app.get('port'), function() {
  //   console.log('Express server listening on port ' + server.address().port);
  // });
  var server = app.listen(3000,'::1', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port)
});
 
  module.exports = app;
}());