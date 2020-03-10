import {types} from 'mobx-state-tree';
import Institute from './institute';

const User = types.model('User', {
  id: types.identifier,
  name: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  gender: types.enumeration(['Male', 'Female']),
  dob: types.string,
  avatar: types.maybeNull(types.string),
  status: types.boolean,
  unique_id: types.maybeNull(types.string),
  institute: types.maybeNull(Institute),
  class: types.maybeNull(types.string),
  school: types.maybeNull(types.string),
});

export default User;
