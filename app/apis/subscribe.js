import axios from 'axios';

export async function subscribe(email) {
    const response = await axios.post('http://localhost:8080/subscribe', { email })
    return response.data
}
