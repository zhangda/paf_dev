
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var category = require('./routes/category');
var api = require('./routes/api');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

// 
mongoose.connect('mongodb://localhost/paf_dev')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
   console.log('yay!')
  });

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index)

app.get('/categories', category.list)
app.post('/category', category.post)
//app.get('/category/:key', category.get)
app.get('/category/query', category.query)
app.del('/category/:id', category.remove)
app.put('/category/:id', category.update)

app.get('/apis', api.list)
app.post('/api', api.post)
//app.get('/api/:key', api.get)
app.get('/api/query', api.query)
app.del('/api/:id', api.remove)
app.put('/api/:id', api.update)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
