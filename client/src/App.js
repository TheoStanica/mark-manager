import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './components/Navigation';
import { StyledFullPage } from './styles';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <StyledFullPage>
            <Navigation />
          </StyledFullPage>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
