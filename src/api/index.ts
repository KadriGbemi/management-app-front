import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

type APIMethodProps = 'GET' | 'POST' | 'PUT' | 'DELETE'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Custom hook for handling API requests
export const useApiRequest = <T>(url?: string, method?: APIMethodProps, body?: any) => {
  const [data, setData] = useState<T | null | undefined>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (url) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          let response: AxiosResponse<T>;
          switch (method) {
            case 'GET':
              response = await api.get<T>(url);
              break;
            case 'POST':
              response = await api.post<T>(url, body);
              break;
            case 'PUT':
              response = await api.put<T>(url, body);
              break;
            case 'DELETE':
              response = await api.delete<T>(url);
              break;
            default:
              throw new Error(`Unsupported method: ${method}`);
          }
          
          setData(response.data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [url, method]);

  return { data, error, loading };
};

// Function for individual requests without hooks
export const apiRequest = async <T>(url: string, method: APIMethodProps, body?: any): Promise<{ data: T | null, error: string | null }> => {
  try {
    let response: AxiosResponse<T>;
    switch (method) {
      case 'GET':
        response = await api.get<T>(url);
        break;
      case 'POST':
        response = await api.post<T>(url, body);
        break;
      case 'PUT':
        response = await api.put<T>(url, body);
        break;
      case 'DELETE':
        response = await api.delete<T>(url, body);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    return { data: response.data, error: null };
  } catch (err: any) {
    const error = err?.response?.data?.message || err.message
    return { data: null, error: err instanceof Error ? error : 'An error occurred' };
  }
};
