import {flow, types} from 'mobx-state-tree';
import {getAuthUser} from '../../api/get_auth_user';
import AppStore from '../store/appStore';
import User from '../types/user';

const AuthModel = types
  .model('AuthModel', {
    loading: types.boolean,
    loaded: types.boolean,
    token: types.string,
    authUser: types.maybeNull(types.reference(User)),
    initial_screen: types.string,
  })
  .views(self => ({
    get settings() {
      return self.authUser?.settings.reduce((obj, item) => {
        return {
          ...obj,
          [item['key']]: item['value'],
        };
      }, {});
    },
  }))
  .actions(self => ({
    setUser: flow(function*(user) {
      self.authUser = user.id;
    }),

    setToken: flow(function*(token) {
      self.token = token;
    }),

    setInitialScreen: flow(function*(initial_screen) {
      self.initial_screen = initial_screen;
    }),

    getAuthUser: flow(function*() {
      try {
        const {data}: any = yield getAuthUser({token: self.token});

        AppStore.user.addUser(data.user);
      } catch (error) {
        console.log(error.response.data);
      }
    }),
  }));

export default AuthModel;
