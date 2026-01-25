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

export function fetchBlogs() {
    const url = "http://localhost:8080/posts"
    const request = useFetch(url);
    return request
}