import {flow, types} from 'mobx-state-tree';
import {updateProfile} from '../../api/update_profile';
import {updateSubscription} from '../../api/update_subscription';
import {screens} from '../../libs/screens';
import AppStore from '../store/appStore';
import User from '../types/user';

const UserModel = types
  .model('UserModel', {
    loading: types.boolean,
    loaded: types.boolean,
    users: types.array(User),
  })
  .actions(self => ({
    addUser: flow(function*(user) {
      const index = self.users.findIndex(u => u.id === user.id);

      if (index >= 0) {
        self.users[index] = user;
      } else {
        self.users.push(user);
      }
    }),

    updateProfile: flow(function*({navigation}) {
      const {token, authUser} = AppStore.auth;

      self.loading = true;

      try {
        const {data} = yield updateProfile({user: authUser, token});

        const index = self.users.findIndex(u => u.id === authUser.id);
        self.users[index] = data.user;

        self.loading = false;
        self.loaded = true;

        if (authUser.status === true) {
          navigation.pop();
        } else {
          navigation.replace(screens.Home);
        }
      } catch (error) {
        self.loading = false;
        self.loaded = true;
      }
    }),

    updateSubscription: flow(function*({plan_id, payment_id}) {
      const {token, authUser} = AppStore.auth;

      self.loading = true;

      try {
        const {data} = yield updateSubscription({
          plan_id,
          payment_id,
          token,
        });

        const index = self.users.findIndex(u => u.id === authUser.id);
        self.users[index] = data.user;

        self.loading = false;
        self.loaded = true;
      } catch (error) {
        console.log(error);

        self.loading = false;
        self.loaded = true;
      }
    }),
  }));

export default UserModel;
