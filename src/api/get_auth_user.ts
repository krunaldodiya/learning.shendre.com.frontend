import axios from 'axios';
import {apiUrl} from '../libs/vars';

export async function getAuthUser(payload: any) {
  const {token} = payload;

  return await axios.post(`${apiUrl}/users/me`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
