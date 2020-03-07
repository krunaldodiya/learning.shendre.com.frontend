import {
  GET_AUTH_USER,
  SET_INITIAL_SCREEN,
  UPDATE_PROFILE,
} from '../constants/auth';

export function setInitialScreen(initial_screen: string) {
  return {
    type: SET_INITIAL_SCREEN,
    payload: {initial_screen},
  };
}

export function updateProfile(user: any, navigation: any) {
  return {
    type: UPDATE_PROFILE,
    payload: {user, navigation},
  };
}

export function getAuthUser() {
  return {
    type: GET_AUTH_USER,
  };
}
