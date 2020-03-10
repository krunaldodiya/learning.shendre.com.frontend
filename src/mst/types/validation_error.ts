import {types} from 'mobx-state-tree';

const ValidationError = types.model('ValidationError', {
  message: types.string,
  errors: types.map(types.array(types.string)),
});

export default ValidationError;
