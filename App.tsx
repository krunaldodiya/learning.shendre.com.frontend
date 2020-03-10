import {observer} from 'mobx-react';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import AppStore from './src/mst/store/appStore';
import InitialScreen from './src/screens/InitialScreen';

function App() {
  const {rehydrated, auth} = AppStore;

  if (!rehydrated) {
    return <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} />;
  }

  return <InitialScreen initial_screen={auth.initial_screen} />;
}

export default observer(App);
