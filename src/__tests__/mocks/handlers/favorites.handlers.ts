import { http, HttpResponse } from 'msw';
import { mockFavorites as initialFavorites, MOCK_API_URL } from '../../utils/mock-data';

let currentFavorites = [...initialFavorites];

export const favoritesHandlers = [
    http.get(`${MOCK_API_URL}/favorites/`, () => {
        return HttpResponse.json(currentFavorites);
    }),

    http.post(`${MOCK_API_URL}/favorites/:id`, async ({ params, request }) => {
        const { id } = params;
        const body = await request.json() as any;
        const newFavorite = { id: `fav_${id}`, job_id: id as string, ...body };
        currentFavorites.push(newFavorite);
        return HttpResponse.json(newFavorite, { status: 201 });
    }),

    http.delete(`${MOCK_API_URL}/favorites/:id`, ({ params }) => {
        const { id } = params;
        currentFavorites = currentFavorites.filter(fav => fav.job_id !== id);
        return HttpResponse.json({});
    }),

    http.get(`${MOCK_API_URL}/favorites/:id/status`, ({ params }) => {
        const { id } = params;
        const isFavorite = currentFavorites.some(fav => fav.job_id === id);
        return HttpResponse.json({ is_favorited: isFavorite }); // Note: API returns is_favorited (checked against test failure provided undefined, so maybe I should match what the service expects. Service expects is_favorited. Test expects status.is_favorited. My mock was sending is_favorite. Service interface probably expects snake_case or whatever.
        // Wait, why did the test fail with "expected undefined to be true"?
        // Because result was undefined? Or property on result was undefined?
        // expect(status.is_favorited).toBe(true);
        // If status was returned as { is_favorite: ... }, then status.is_favorited is undefined.
        // I need to check what the real API returns.
        // favorites.service.ts checkStatus probably maps it.
        // Let's check favorites.service.ts or api definition if possible.
        // But the previous failure said "received undefined".
    }),
];
