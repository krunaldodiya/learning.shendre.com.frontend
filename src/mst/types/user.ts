import {types} from 'mobx-state-tree';

const User = types.model('User', {
  id: types.identifier,
  name: types.string,
  gender: types.enumeration(['Male', 'Female']),
  dob: types.string,
  avatar: '',
  status: types.boolean,
  unique_id: types.string,
});

export default User;
