import {SET_INITIAL_SCREEN} from '../constants/auth';

export function setInitialScreen(initial_screen: string) {
  return {
    type: SET_INITIAL_SCREEN,
    payload: {initial_screen},
  };
}
