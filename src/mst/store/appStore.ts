import AsyncStorage from '@react-native-community/async-storage';
import {types} from 'mobx-state-tree';
import {persist} from 'mst-persist';
import {screens} from '../../libs/screens';
import AuthModel from '../models/authModel';
import CategoryModel from '../models/categoryModel';
import OtpModel from '../models/otpModel';
import PlayerModel from '../models/playerModel';
import UserModel from '../models/userModel';

const AppModel = types.model('AppModel', {
  rehydrated: types.boolean,
  auth: AuthModel,
  user: UserModel,
  otp: OtpModel,
  category: CategoryModel,
  player: PlayerModel,
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
  player: {
    videoList: [],
    currentVideo: null,
    previousVideo: null,
    nextVideo: null,
    isFinished: false,
    isPaused: false,
    isFullScreen: false,
    showOverlay: false,
    progress: 0,
    duration: 0,
    rate: 1,
    quality: 480,
    showModal: false,
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
  blacklist: [],
}).then(() => AppStore.setRehydrated());

export default AppStore;
