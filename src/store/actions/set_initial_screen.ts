import {SET_INITIAL_SCREEN} from '../constants';

export function setInitialScreen(screen: string) {
  return {
    type: SET_INITIAL_SCREEN,
    payload: screen,
  };
}
