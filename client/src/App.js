import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './components/Header';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="min-vh-100 d-flex flex-column">
            <Header />
            <div className="container flex-grow-1">
              <Switch>
                <Navigation />
              </Switch>
            </div>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
