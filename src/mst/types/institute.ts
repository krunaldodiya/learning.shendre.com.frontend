import {types} from 'mobx-state-tree';

const Institute = types.model('Institute', {
  id: types.identifier,
  name: types.string,
});

export default Institute;
