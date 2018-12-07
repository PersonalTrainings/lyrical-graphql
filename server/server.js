const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config.json');
const schema = require('./schema/schema');

const app = express();

(function() {
  // Step 1: Create & configure a webpack compiler
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');
  const compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(
    require('webpack-dev-middleware')(compiler, {
      logLevel: 'warn',
      publicPath: '/',
      watchOptions: {
        poll: true
      },
      stats: {
        colors: true
      }
    })
  );

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    })
  );
})();

// Local DB
const MONGO_URI = `mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`;

if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useMongoClient: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

module.exports = app;
