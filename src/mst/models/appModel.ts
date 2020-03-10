import {types} from 'mobx-state-tree';
import {AuthModel} from './authModel';
import {OtpModel} from './otpModel';
import {UserModel} from './userModel';

export const AppModel = types
  .model('AppModel', {
    rehydrated: types.boolean,
    auth: AuthModel,
    user: UserModel,
    otp: OtpModel,
  })
  .actions(self => ({
    setRehydrated() {
      self.rehydrated = true;
    },
  }));
