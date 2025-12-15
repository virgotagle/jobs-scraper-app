export interface ApiError {
    status: number;
    message: string;
}

export interface PaginationParams {
    skip?: number;
    limit?: number;
}
