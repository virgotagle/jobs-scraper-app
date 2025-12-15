const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'test-api-key';

interface RequestOptions extends RequestInit {
    params?: Record<string, string | number | undefined>;
}

export class TestClient {
    private static async request(endpoint: string, options: RequestOptions = {}) {
        const { params, ...init } = options;

        let url = `${API_URL}${endpoint}`;
        if (params) {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) {
                    searchParams.append(key, String(value));
                }
            });
            url += `?${searchParams.toString()}`;
        }

        const response = await fetch(url, {
            ...init,
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY,
                ...init.headers,
            },
        });

        return response;
    }

    static async get(endpoint: string, params?: Record<string, string | number | undefined>) {
        return this.request(endpoint, { method: 'GET', params });
    }

    static async post(endpoint: string, body?: any) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    static async delete(endpoint: string) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // Helpers
    static async getFirstJobId(): Promise<string | null> {
        const res = await this.get('/jobs/', { limit: 1 });
        if (!res.ok) return null;
        const jobs = await res.json();
        return jobs.length > 0 ? jobs[0].job_id : null;
    }

    static async cleanupFavorites() {
        // Get all favorites and delete them
        const res = await this.get('/favorites/');
        if (res.ok) {
            const favorites = await res.json();
            for (const fav of favorites) {
                await this.delete(`/favorites/${fav.job_id}`);
            }
        }
    }
}
