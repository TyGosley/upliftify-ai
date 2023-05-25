import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import EmotionDropdown from './components/EmotionDropdown';
import NavBar from './components/AppNavbar';
import Footer from './components/Footer';
import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <div className="App">
            <NavBar />
            <header className="App-header">
              <h1 className="UpliftTitle">Upliftify Ai</h1>
              <EmotionDropdown />
              <div className="container">
                
              </div>
            </header>
            <Footer />
          </div>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
