const express = require('express');

const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const router = express.Router();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

router.use(cors(), graphqlHTTP({
  schema,
  graphiql: true,
}));

module.exports = router;
