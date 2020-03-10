import axios from 'axios';
import {flow, types} from 'mobx-state-tree';
import {apiUrl} from '../../libs/vars';
import User from '../types/user';
import {AppStore} from '../store/appStore';

export const AuthModel = types
  .model('AuthModel', {
    loading: types.boolean,
    loaded: types.boolean,
    token: types.string,
    authUser: types.maybeNull(types.reference(User)),
    initial_screen: types.string,
  })
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
        const {data}: any = yield axios.post(
          `${apiUrl}/users/me`,
          {},
          {
            headers: {
              Authorization: `Bearer ${self.token}`,
            },
          },
        );

        AppStore.user.addUser(data.user);
      } catch (error) {
        console.log(error.response.data);
      }
    }),
  }));
