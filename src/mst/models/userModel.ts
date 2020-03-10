import {flow, types} from 'mobx-state-tree';
import User from '../types/user';

export const UserModel = types
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
  }));
