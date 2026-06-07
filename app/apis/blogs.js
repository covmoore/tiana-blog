import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetch(url) {
    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            setState({data: null, loading: true, error: null});
            try {
                const config = {
                    headers: {}
                  };
                const response = await axios.get(url, config);
                setState({data: response.data, loading: false, error: null});
            } catch (error) {
                console.error("ERR", error)
                setState({
                    data: null,
                    loading: false,
                    error: 'Failed to fetch data',
                });
            }
        };

        fetchData();
    }, [url]);

    return state;
}

function authHeaders() {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
}

function usePost(url, payload) {
    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            setState({data: null, loading: true, error: null});
            try {
                const response = await axios.post(url, payload, { headers: authHeaders() });
                setState({data: response.data, loading: false, error: null});
            } catch (error) {
                console.error("ERR", error)
                setState({
                    data: null,
                    loading: false,
                    error: 'Failed to fetch data',
                });
            }
        };

        fetchData();
    }, [url]);

    return state;
}

export function fetchBlogs() {
    const url = "http://localhost:8080/posts"
    const request = useFetch(url);
    return request
}


export function createPost(payload) {
    const url = "http://localhost:8080/posts"
    const request = usePost(url, payload);
    return request
}

export async function deletePost(postId) {
    const response = await axios.delete(`http://localhost:8080/posts/${postId}`, { headers: authHeaders() })
    return response.data
}

export function fetchConfig(type) {
  const url = `http://localhost:8080/config/${type}`
  const request = useFetch(url);
  return request
}