import axios from 'axios';
import {apiUrl} from '../libs/vars';

export async function loadCategories(payload: any) {
  const {token} = payload;

  return await axios.post(`${apiUrl}/categories/all`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
