import {schema} from 'normalizr';

export const quiz = new schema.Entity('quizzes');
export const quizList = new schema.Array(quiz);
