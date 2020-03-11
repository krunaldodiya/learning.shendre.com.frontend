import {connectReduxDevtools} from 'mst-middlewares';
import AppStore from './src/mst/store/appStore';

connectReduxDevtools(require('remotedev'), AppStore);
