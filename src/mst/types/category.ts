import {types} from 'mobx-state-tree';
import Chapter from './chapter';

const Category = types.model('Category', {
  id: types.identifier,
  name: types.string,
  image: types.string,
  order: types.number,
  chapters: types.array(Chapter),
});

export default Category;
