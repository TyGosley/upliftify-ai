import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import SavedEmotions from '../src/pages/SavedEmotions';
import HelpfulLinks from '../src/pages/HelpfulLinks';
import Footer from '../src/components/Footer';

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
            <Navbar />
            <header className="App-header">
              <h1 className='UpliftTitle'>Upliftify Ai</h1>
              
              <div className="container">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/saved" element={<SavedEmotions />} />
                </Routes>
                
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
