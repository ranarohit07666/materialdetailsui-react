
import React from 'react';
import { Provider } from 'react-redux';
import store from './state/store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import {Main} from './layout/Main';
import { Header } from './layout/Header';
import {Footer} from './layout/Footer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Main />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
