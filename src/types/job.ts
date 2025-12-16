export interface JobListingResponse {
  job_id: string;
  title: string;
  details?: string;
  // Optional fields that might be missing in some backend implementations
  job_details_url?: string;
  job_summary?: string;
  company_name?: string;
  location?: string;
  country_code?: string;
  listing_date?: string;
  salary_label?: string;
  work_type?: string;
  job_classification?: string;
  job_sub_classification?: string;
  work_arrangements?: string;
  is_favorite?: boolean;
}

export interface JobWithDetailsResponse extends JobListingResponse {
  status?: string;
  is_expired?: boolean;
  // details is inherited from JobListingResponse
  is_verified?: boolean;
  expires_at?: string;
}

export interface JobStatsResponse {
  total_jobs: number;
  new_jobs: number;
}

export interface JobQueryParams {
  job_classification?: string;
  job_sub_classification?: string;
  work_arrangements?: string;
  skip?: number;
  limit?: number;
}

export interface JobSearchParams {
  keyword: string;
  skip?: number;
  limit?: number;
}


