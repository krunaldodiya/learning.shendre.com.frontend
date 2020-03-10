import {flow, types} from 'mobx-state-tree';
import {loadCategories} from '../../api/load_categories';
import AppStore from '../store/appStore';
import Category from '../types/category';

const CategoryModel = types
  .model('CategoryModel', {
    loading: types.boolean,
    loaded: types.boolean,
    categories: types.array(Category),
  })
  .actions(self => ({
    loadCategories: flow(function*() {
      self.loading = true;

      try {
        const {data} = yield loadCategories({token: AppStore.auth.token});

        self.categories = data.categories;
        self.loading = false;
        self.loaded = true;
      } catch (error) {
        self.loading = false;
        self.loaded = true;
      }
    }),
  }));

export default CategoryModel;
