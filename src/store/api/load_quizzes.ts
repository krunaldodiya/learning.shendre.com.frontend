import axios from 'axios';
import {apiUrl} from '../../libs/vars';

export async function loadQuizzes(payload: any) {
  return await axios.post(`${apiUrl}/quizzes`, payload);
}
