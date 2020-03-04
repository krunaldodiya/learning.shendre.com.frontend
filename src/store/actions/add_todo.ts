import {ADD_TODO} from '../constants';

export function addTodo(todoName: string) {
  return {
    type: ADD_TODO,
    payload: todoName,
  };
}
