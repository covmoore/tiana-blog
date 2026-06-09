import { useEffect, useState } from 'react';
import axios from 'axios';
import { authHeaders } from './blogs';

const BASE_URL = "http://localhost:8080"

function useFetchImages(url) {
    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            setState({ data: null, loading: true, error: null });
            try {
                const response = await axios.get(url);
                setState({ data: response.data, loading: false, error: null });
            } catch (error) {
                console.error("ERR", error);
                setState({ data: null, loading: false, error: 'Failed to fetch images' });
            }
        };
        fetchData();
    }, [url]);

    return state;
}

export function fetchHomeImages() {
    return useFetchImages(`${BASE_URL}/images/home`);
}

export function fetchAboutMeImages() {
    return useFetchImages(`${BASE_URL}/images/about-me`);
}

export function fetchPostImages(postId) {
    return useFetchImages(`${BASE_URL}/images/posts/${postId}`);
}

export async function uploadImage(section, file, postId = null) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('section', section);
    if (postId !== null) formData.append('postId', postId);

    const response = await axios.post(`${BASE_URL}/images`, formData, {
        headers: authHeaders()
    });
    return response.data;
}
