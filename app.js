
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var category = require('./routes/category');
var api = require('./routes/api');
var upload = require('./routes/upload')
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
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: path.join(__dirname, 'tmp' )}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function auth(req, res, next){
  var auth_header = req.headers['authorization']
  if(auth_header==='HiU4GlEb8SVQVJtre58416bY1F234Ev2')
    next()
  else
    res.json(401,{info:{code:'',message:'unauthorized'}})
}

app.get('/', routes.index)

app.get('/categories', category.list)
app.post('/category', auth, category.post)
//app.get('/category/:key', category.get)
app.get('/category/query', category.query)
app.del('/category/:id', auth, category.remove)
app.put('/category/:id', auth, category.update)

app.get('/apis', api.list)
app.post('/api', auth, api.post)
//app.get('/api/:key', api.get)
app.get('/api/query', api.query)
app.del('/api/:id', auth, api.remove)
app.put('/api/:id', auth, api.update)

app.post('/upload', auth, upload.post)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
