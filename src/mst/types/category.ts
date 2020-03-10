import {types} from 'mobx-state-tree';

const Video = types.model('Video', {
  id: types.identifier,
  title: types.string,
  description: types.string,
  thumbnail: types.string,
  order: types.number,
});

const Topic = types.model('Topic', {
  id: types.identifier,
  name: types.string,
  description: types.string,
  image: types.string,
  order: types.number,
  videos: types.array(Video),
});

const Chapter = types.model('Chapter', {
  id: types.identifier,
  name: types.string,
  description: types.string,
  image: types.string,
  order: types.number,
  topics: types.array(Topic),
});

const Category = types.model('Category', {
  id: types.identifier,
  name: types.string,
  image: types.string,
  order: types.number,
  chapters: types.array(Chapter),
});

export default Category;
