import { ApiError } from '../types/api';



async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error: ApiError = {
            status: response.status,
            message: response.statusText,
        };
        try {
            const data = await response.json();
            error.message = data.detail || data.message || response.statusText;
        } catch (e) {
            // If parsing JSON fails, keep the default status text
        }
        throw error;
    }
    return response.json();
}

async function fetchWrapper<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const url = `${baseUrl}${endpoint}`;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';
    const headers = {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(url, config);
        return handleResponse<T>(response);
    } catch (error) {
        throw error;
    }
}

export const api = {
    get: <T>(endpoint: string, options?: RequestInit) =>
        fetchWrapper<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
        fetchWrapper<T>(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        }),

    delete: <T>(endpoint: string, options?: RequestInit) =>
        fetchWrapper<T>(endpoint, { ...options, method: 'DELETE' }),
};
