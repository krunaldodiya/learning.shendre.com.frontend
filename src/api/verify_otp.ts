import axios from 'axios';
import {apiUrl} from '../libs/vars';

export async function verifyOtp(payload: any) {
  return await axios.post(`${apiUrl}/otp/verify`, payload);
}
