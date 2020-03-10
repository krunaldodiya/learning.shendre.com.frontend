import {types} from 'mobx-state-tree';

const Video = types.model('Video', {
  id: types.identifier,
  title: types.string,
  description: types.string,
  thumbnail: types.string,
  order: types.number,
});

export default Video;
