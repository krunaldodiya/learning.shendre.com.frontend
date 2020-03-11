import {types} from 'mobx-state-tree';

const Setting = types.model('Setting', {
  id: types.identifier,
  key: types.string,
  value: types.string,
  description: types.string,
});

export default Setting;
