import axios from 'axios';
import {apiUrl} from '../../libs/vars';

export async function updateProfile(payload: any) {
  const {user, token} = payload;
  const {name, email, dob, gender, school} = user;

  return await axios.post(
    `${apiUrl}/users/update`,
    {name, email, dob, gender, class: user.class, school},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
