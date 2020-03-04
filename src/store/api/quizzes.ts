import axios from 'axios';
import {api} from '../../libs/vars';

export async function loadQuizzes(payload: any) {
  return await axios.post(`${api}/quizzes`, {
    payload,
  });
}
