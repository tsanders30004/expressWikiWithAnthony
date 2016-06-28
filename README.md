## Express wiki

# 28 Jun 2016

There is a bug in the app.get('/:pageName/edit'...) function.
I get an error that says:

filenameX = pages/aaa.txt
another error
{ Error: ENOENT: no such file or directory, open 'pages/aaa.txt'
    at Error (native)
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'pages/aaa.txt' }



Unknown why this is happening since it worked in the master branch but not
in sanders20160628.
