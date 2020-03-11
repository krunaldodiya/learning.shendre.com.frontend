import AsyncStorage from '@react-native-community/async-storage';
import {types} from 'mobx-state-tree';
import {persist} from 'mst-persist';
import {screens} from '../../libs/screens';
import AuthModel from '../models/authModel';
import CategoryModel from '../models/categoryModel';
import OtpModel from '../models/otpModel';
import UserModel from '../models/userModel';

const AppModel = types.model('AppModel', {
  rehydrated: types.boolean,
  auth: AuthModel,
  user: UserModel,
  otp: OtpModel,
  category: CategoryModel,
});

const initialState = {
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
  category: {
    loading: false,
    loaded: false,
    categories: [],
  },
};

const AppStore = AppModel.actions(self => {
  return {
    setRehydrated() {
      self.rehydrated = true;
    },
  };
}).create(initialState);

persist('@root', AppStore, {
  storage: AsyncStorage,
}).then(() => AppStore.setRehydrated());

export default AppStore;
