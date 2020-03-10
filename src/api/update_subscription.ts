import axios from 'axios';
import {apiUrl} from '../libs/vars';

export async function updateSubscription(payload: any) {
  const {token, plan_id, payment_id} = payload;

  return await axios.post(
    `${apiUrl}/subscriptions/update`,
    {plan_id, payment_id},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
