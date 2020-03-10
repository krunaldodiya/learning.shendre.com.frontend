import {types} from 'mobx-state-tree';
import Plan from './plan';

const Subscription = types.model('Subscription', {
  id: types.identifier,
  pyament_id: types.maybeNull(types.string),
  expires_at: types.maybeNull(types.string),
  created_at: types.maybeNull(types.string),
  plan: types.maybeNull(Plan),
});

export default Subscription;
