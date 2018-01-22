// const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// const pagesRoutes = require('./pages/routes');
const graphqlRoutes = require('./graphql/routes');

const app = express();

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.json());

// app.use('/', pagesRoutes);
app.use('/graphql', graphqlRoutes); // неправильное название пути
// app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

// eslint-disable-next-line no-console
app.listen(app.get('port'), () => console.log(`Express app listening on localhost:${app.get('port')}`));
