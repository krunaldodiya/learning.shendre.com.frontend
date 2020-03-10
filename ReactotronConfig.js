import AsyncStorage from '@react-native-community/async-storage';
import {mst} from 'reactotron-mst';
import Reactotron from 'reactotron-react-native';
import AppStore from './src/mst/store/appStore';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure()
  .useReactNative()
  .use(mst())
  .connect();

Reactotron.trackMstNode(AppStore);
