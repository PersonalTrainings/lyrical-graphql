const app = require('./server/server');

app.listen(4000, (err) => {
  if (err) { return console.log(err); }

  console.log('API Server is listening on http://localhost:4000');
});
