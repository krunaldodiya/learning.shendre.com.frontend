import {types} from 'mobx-state-tree';
import Video from './video';

const Topic = types.model('Topic', {
  id: types.identifier,
  name: types.string,
  description: types.string,
  image: types.string,
  order: types.number,
  videos: types.array(Video),
});

export default Topic;
