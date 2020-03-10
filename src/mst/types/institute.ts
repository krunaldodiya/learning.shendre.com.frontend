import {types} from 'mobx-state-tree';
import Plan from './plan';

const Institute = types.model('Institute', {
  id: types.identifier,
  name: types.string,
  plans: types.array(Plan),
});

export default Institute;
