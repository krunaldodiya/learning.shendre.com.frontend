import {types} from 'mobx-state-tree';

const Category = types.model('Category', {
  id: types.identifier,
  name: types.string,
});

export default Category;
