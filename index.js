if (__DEV__) {
  import('./RNDebuggerConfig').then(() =>
    console.log('RNDebuggerConfig Configured'),
  );
}

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
