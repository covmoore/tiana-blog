import axios from 'axios';
import { BASE_URL } from './config';

export async function subscribe(email) {
    const response = await axios.post(`${BASE_URL}/subscribe`, { email })
    return response.data
}
