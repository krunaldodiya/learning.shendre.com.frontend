import {types} from 'mobx-state-tree';
import Topic from './topic';

const Chapter = types.model('Chapter', {
  id: types.identifier,
  name: types.string,
  description: types.string,
  image: types.string,
  order: types.number,
  topics: types.array(Topic),
});

export default Chapter;
