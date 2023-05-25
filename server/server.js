const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const apiRoutes = require('./routes/apiRoutes');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Create a new instance of Apollo Server with the GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

async function startServer() {
  // Start the Apollo Server
  await server.start();

  // Apply Apollo Server middleware to Express app
  server.applyMiddleware({ app });

  // Connect to the database
  await db.once('open', () => {
    // Start the server after the database connection is established
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`GraphQL server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

// Call the asynchronous function to start the server
startServer().catch((err) => console.error('Error starting server:', err));

module.exports = app;
