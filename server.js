function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
const express = require('express');
const app = express();
app.use(requireHTTPS);

app.use(express.static('./dist/toDo-list'));

app.get('/*', function(req, res) {
  res.sendFile('dist/toDo-list/index.html', {root: 'dist/toDo-list/'});
});

app.listen(process.env.PORT || 8080);
