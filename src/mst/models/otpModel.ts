import axios from 'axios';
import {flow, types} from 'mobx-state-tree';
import {screens} from '../../libs/screens';
import {apiUrl} from '../../libs/vars';
import {AppStore} from '../store/appStore';
import ValidationError from '../types/validation_error';

export const OtpModel = types
  .model('OtpModel', {
    loading: types.boolean,
    loaded: types.boolean,
    mobile: types.string,
    clientOtp: types.string,
    serverOtp: types.string,
    errors: types.maybeNull(ValidationError),
  })
  .views(self => ({
    getError: function(key: string) {
      const errorBag = self.errors?.errors;

      if (errorBag?.has(key)) {
        const validationErrors: any = errorBag?.get(key);
        return validationErrors[0];
      }

      return null;
    },
    isDisabled: function(input: string) {
      if (self.loading) return true;

      switch (input) {
        case 'mobile':
          return self.mobile.length < 10 ? true : false;

        case 'clientOtp':
          return self.clientOtp.length < 4 ? true : false;

        default:
          return false;
      }
    },
  }))
  .actions(self => ({
    setMobile: function(mobile: string) {
      self.mobile = mobile;
      self.errors = null;
    },

    setClientOtp: function(clientOtp: string) {
      self.clientOtp = clientOtp;
      self.errors = null;
    },

    requestOtp: flow(function*(mobile: string, navigation: any) {
      self.loading = true;

      try {
        const {data} = yield axios.post(`${apiUrl}/otp/request`, {mobile});
        self.serverOtp = data.otp.toString();
        self.loading = false;
        self.loaded = true;

        navigation.replace(screens.VerifyOtp);
      } catch (error) {
        self.errors = error.response.data;
        self.loading = false;
        self.loaded = true;
      }
    }),

    verifyOtp: flow(function*(
      mobile: string,
      otp: string,
      unique_id: string,
      imei: [],
      navigation: any,
    ) {
      self.loading = true;

      try {
        const {data}: any = yield axios.post(`${apiUrl}/otp/verify`, {
          mobile,
          otp,
          unique_id,
          imei,
        });

        const {token, user} = data;

        const initial_screen =
          user.status === true
            ? user.unique_id === unique_id
              ? screens.Home
              : screens.InvalidDevice
            : screens.EditProfile;

        AppStore.user.addUser(user);

        AppStore.auth.setInitialScreen(initial_screen);
        AppStore.auth.setToken(token);
        AppStore.auth.setUser(user);

        self.loading = false;
        self.loaded = true;

        navigation.replace(initial_screen);
      } catch (error) {
        self.errors = error.response.data;
        self.loading = false;
        self.loaded = true;
      }
    }),
  }));
