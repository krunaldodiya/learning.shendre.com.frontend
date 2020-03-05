import axios from 'axios';
import {apiUrl} from '../../libs/vars';

export async function requestOtp(payload: any) {
  return await axios.post(`${apiUrl}/otp/request`, payload);
}
