var express         = require('express');
var bodyParser      = require('body-parser');
var fs              = require('fs');
var session         = require('express-session');
var wikiLinkify     = require('wiki-linkify');

var app = express();

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
          /* create a new session */
          request.session.user = name;
          response.redirect('/');
     } else {
          console.log('login incorrect.  should send user back to the login page');
          response.redirect('/login');
     }
});

app.get('/:pageName/edit', function(request, response) {
     var pageName = request.params.pageName;
     var pageContents = request.params.fileContent;
     console.log('i think we have to read the file contents from the text file since no way to pass it back from *.hbs file');

     /* start here */
     var fn = 'pages/' + pageName + '.txt';
     console.log('filenameX = ' + fn);
     fs.readFile(fn, function(err, data){
          if (err) {
               console.log('another error');
               console.error(err);
               return;
          }
          var fileData = data;
          console.log('the file data is ' + data);

          response.render('edit.hbs', {
               title: 'Edit ' + pageName,
               pageName: pageName,
               fileData: fileData
          });
     });
     /* end here */

});

app.post('/:pageName/save', function(request, response) {
     var pageName = request.params.pageName;
     var content = request.body.content;
     var filename = 'pages/' + pageName + '.txt';
     fs.writeFile(filename, content, function(err) {
          response.redirect('/' + pageName);
     });
});

app.get('/:pageName', function(request, response) {
     var title = request.params.pageName;
     var pageName = request.params.pageName;
     var fileName = 'pages/' + request.params.pageName + '.txt';
     console.log('pageName = ' + pageName);
     console.log('filename = ' + fileName);

     fs.readFile(fileName, function(err, data){
          /* i.e., file does not exist */
          if (err){
               console.log('file does not exist.  creeating file via placeholder.hbs');
               console.error(err);
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

app.listen(3000, function() {
     console.log('Listening on port 3000.');
});
