import AsyncStorage from '@react-native-community/async-storage';
import {persist} from 'mst-persist';
import {screens} from '../../libs/screens';
import {AppModel} from '../models/appModel';

export const AppStore = AppModel.create({
  rehydrated: false,
  auth: {
    initial_screen: screens.RequestOtp,
    loading: false,
    loaded: false,
    token: '',
    authUser: null,
  },
  user: {
    loading: false,
    loaded: false,
    users: [],
  },
  otp: {
    loading: false,
    loaded: false,
    mobile: '',
    clientOtp: '',
    serverOtp: '',
    errors: null,
  },
});

persist('@root', AppStore, {
  storage: AsyncStorage,
}).then(() => AppStore.setRehydrated());
