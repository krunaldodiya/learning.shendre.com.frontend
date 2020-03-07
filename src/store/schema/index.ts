import {schema} from 'normalizr';

export const video = new schema.Entity('videos');

export const topic = new schema.Entity('topics', {
  videos: [video],
});

export const chapter = new schema.Entity('chapters', {
  topics: [topic],
});

export const category = new schema.Entity('categories', {
  chapters: [chapter],
});

export const categoryList = new schema.Array(category);
