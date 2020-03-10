import {flow, types} from 'mobx-state-tree';
import {updateProfile} from '../../api/update_profile';
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

    updateProfile: flow(function*({user, navigation}) {
      self.loading = true;

      try {
        const {data} = yield updateProfile({user, token: AppStore.auth.token});
        const index = self.users.findIndex(u => u.id === user.id);

        self.users[index] = data.user;

        self.loading = false;
        self.loaded = true;

        if (AppStore.auth.authUser.status === true) {
          navigation.pop();
        } else {
          navigation.replace(screens.Home);
        }
      } catch (error) {
        self.loading = false;
        self.loaded = true;
      }
    }),
  }));

export default UserModel;
