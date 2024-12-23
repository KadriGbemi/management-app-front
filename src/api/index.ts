import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { isEmpty } from '../utils';
import { useNotification } from '../context/Notification';

type APIMethodProps = 'GET' | 'POST' | 'PUT' | 'DELETE'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Custom hook for handling API requests
export const useApiRequest = <T>(url?: string, method?: APIMethodProps, reloadData?: boolean, body?: any) => {
  const [data, setData] = useState<T | null | undefined>(null);
  const { error, setError } = useNotification()
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (url) {
      const fetchData = async () => {
        setLoading(true);
        setError?.(undefined);
        try {
          let response: AxiosResponse<T>;
          switch (method) {
            case 'GET':
              response = await api.get<T>(url);
              break;
            case 'POST':
              response = await api.post<T>(url, JSON.stringify(body));
              break;
            case 'PUT':
              response = await api.put<T>(url, JSON.stringify(body));
              break;
            case 'DELETE':
              response = await api.delete<T>(url);
              break;
            default:
              throw new Error(`Unsupported method: ${method}`);
          }

          setData(response.data);
        } catch (err: any) {
          const defaultErrorMessage = err?.response?.data?.message || err.message

          setError?.(err instanceof Error ? defaultErrorMessage : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [url, method, reloadData]);

  return { data, error, loading, setError, reloadData, setLoading };
};

// Function for individual requests without hooks
export const apiRequest = async <T>(url: string, method: APIMethodProps, body?: any): Promise<{ data: T | null, error?: string | null, errors?: Record<string, string> }> => {
  try {
    let response: AxiosResponse<T>;
    switch (method) {
      case 'GET':
        response = await api.get<T>(url);
        break;
      case 'POST':
        response = await api.post<T>(url, JSON.stringify(body));
        break;
      case 'PUT':
        response = await api.put<T>(url, JSON.stringify(body));
        break;
      case 'DELETE':
        response = await api.delete<T>(url, body);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return { data: response.data };
  } catch (err: any) {
    const errors = err?.response?.data?.errors || {}

    const defaultErrorMessage = err?.response?.data?.message || err.message

    const errorMessage = err instanceof Error ? defaultErrorMessage : 'An error occurred'

    const error = isEmpty(errors) ? errorMessage : null
    return { data: null, errors, error };
  }
};
