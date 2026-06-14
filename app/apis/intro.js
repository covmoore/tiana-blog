import { useEffect, useState } from 'react';
import axios from 'axios';
import { authHeaders } from './blogs';
import { BASE_URL } from './config';

export function fetchIntro() {
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        const load = async () => {
            setState({ data: null, loading: true, error: null });
            try {
                const response = await axios.get(`${BASE_URL}/intro`);
                setState({ data: response.data, loading: false, error: null });
            } catch (error) {
                console.error("ERR", error);
                setState({ data: null, loading: false, error: 'Failed to fetch intro' });
            }
        };
        load();
    }, []);

    return state;
}

export async function updateIntro(title, body) {
    const response = await axios.put(`${BASE_URL}/intro`, { title, body }, {
        headers: authHeaders()
    });
    return response.data;
}
