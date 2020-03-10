import {types} from 'mobx-state-tree';

const Plan = types.model('Plan', {
  id: types.identifier,
  name: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  image: types.maybeNull(types.string),
  category_id: types.maybeNull(types.string),
  expires_at: types.maybeNull(types.string),
  price: types.maybeNull(types.number),
  trial_days: types.maybeNull(types.number),
});

export default Plan;
