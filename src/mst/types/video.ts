import {types} from 'mobx-state-tree';

const Video = types.model('Video', {
  id: types.identifier,
  title: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  thumbnail: types.maybeNull(types.string),
  url: types.maybeNull(types.string),
  order: types.number,
});

export default Video;
