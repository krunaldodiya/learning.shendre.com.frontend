import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import InitialScreen from './src/screens/InitialScreen';
import {persistor, store} from './src/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InitialScreen />
      </PersistGate>
    </Provider>
  );
}

export default App;
