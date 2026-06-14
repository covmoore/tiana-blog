import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './config';

function useFetch(url, headers = {}) {
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
                    headers
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

export function authHeaders() {
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

export function fetchBlogs(includeDrafts = false) {
    const url = includeDrafts
        ? `${BASE_URL}/posts?includeDrafts=true`
        : `${BASE_URL}/posts`
    const request = useFetch(url, includeDrafts ? authHeaders() : {});
    return request
}


export function createPost(payload) {
    const url = `${BASE_URL}/posts`
    const request = usePost(url, payload);
    return request
}

export async function updatePost(postId, payload) {
    const response = await axios.put(`${BASE_URL}/posts/${postId}`, payload, { headers: authHeaders() })
    return response.data
}

export async function deletePost(postId) {
    const response = await axios.delete(`${BASE_URL}/posts/${postId}`, { headers: authHeaders() })
    return response.data
}

export function fetchConfig(type) {
  const url = `${BASE_URL}/config/${type}`
  const request = useFetch(url);
  return request
}