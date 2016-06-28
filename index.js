var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var wikiLinkify = require('wiki-linkify');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(request, response) {
  response.redirect('/HomePage');
});

app.get('/login', function(request, response) {
  response.render('login');
});

app.post('/login-submit', function(request, response) {
  var name = request.body.name;
  var password = request.body.password;
  console.log('name = ' + name);
  console.log('password = ' + name);
  if (name === 'anthony' && password === '123') {
    console.log('login correct');
    response.redirect('/');
  } else {
    console.log('login incorrect');
    response.redirect('/login');
  }
});


app.get('/:pageName', function(request, response) {
  var title = request.params.pageName;
  var pageName = request.params.pageName;
  var fileName = 'pages/' + request.params.pageName + '.txt';
  console.log('pageName = ' + pageName);
  console.log('filename = ' + fileName);

  fs.readFile(fileName, function(err, data){
    if (err){
      console.log('file read error');
      response.render('placeholder', {title : title});
      return;
    }
    // console.log(data.toString());
    var fileContent = data.toString();
    console.log('file content = ' + fileContent);
    // console.log(data.toString());
    var wikiContent = wikiLinkify(fileContent);
      response.render('extrapage', {fileContent : fileContent,
              wikiContent : wikiContent,
              pageName : pageName});

  });

});

app.get('/:pageName/edit', function(request, response) {
  var pageName = request.params.pageName;
  response.render('edit.hbs', {
    title: 'Edit ' + pageName,
    pageName: pageName
  });
});

app.post('/:pageName/save', function(request, response) {
  var pageName = request.params.pageName;
  var content = request.body.content;
  var filename = 'pages/' + pageName + '.txt';
  fs.writeFile(filename, content, function(err) {
    response.redirect('/' + pageName);
  });
});

app.listen(3000, function() {
  console.log('Listening on port 3000.');
});
