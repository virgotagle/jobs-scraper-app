import { jobsHandlers } from './jobs.handlers';
import { favoritesHandlers } from './favorites.handlers';

export const handlers = [
    ...jobsHandlers,
    ...favoritesHandlers,
];
