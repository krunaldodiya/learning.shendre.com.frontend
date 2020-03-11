import {types} from 'mobx-state-tree';
import Institute from './institute';
import Setting from './setting';
import Subscription from './subscription';

const User = types.model('User', {
  id: types.identifier,
  name: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  mobile: types.maybeNull(types.string),
  gender: types.enumeration(['Male', 'Female']),
  dob: types.string,
  avatar: types.maybeNull(types.string),
  status: types.boolean,
  unique_id: types.maybeNull(types.string),
  institute: types.maybeNull(Institute),
  class: types.maybeNull(types.string),
  school: types.maybeNull(types.string),
  subscriptions: types.array(Subscription),
  settings: types.array(Setting),
});

export default User;
