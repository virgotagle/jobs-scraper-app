import { JobListingResponse, JobWithDetailsResponse, JobStatsResponse } from '../../../types/job';
import { FavoriteJobResponse, FavoriteStatusResponse } from '../../../types/favorite';

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

function validateStructure(data: any, expectedFields: Record<string, string | string[]>, optionalFields: Record<string, string | string[]> = {}): ValidationResult {
    const errors: string[] = [];

    if (!data || typeof data !== 'object') {
        return { valid: false, errors: ['Response data is not an object'] };
    }

    const checkType = (field: string, value: any, expectedType: string | string[]) => {
        const types = Array.isArray(expectedType) ? expectedType : [expectedType];

        // Special handle for array type check which is not a typeof result
        if (types.includes('array')) {
            if (Array.isArray(value)) return true;
            // If array is one of the options but not the only one, we continue checking others
        }

        const valueType = typeof value;
        if (types.includes(valueType)) return true;

        // If we have 'array' in types but value wasn't array (checked above)
        // and valueType wasn't in types.
        return false;
    };

    const formatType = (t: string | string[]) => Array.isArray(t) ? t.join(' or ') : t;

    // Check required fields
    for (const [field, type] of Object.entries(expectedFields)) {
        if (!(field in data)) {
            errors.push(`Missing required field: ${field}. keys present: ${Object.keys(data).join(',')}`);
        } else if (!checkType(field, data[field], type)) {
            errors.push(`Field ${field} should be type ${formatType(type)}, got ${typeof data[field]}`);
        }
    }

    // Check optional fields if present
    for (const [field, type] of Object.entries(optionalFields)) {
        if (field in data && data[field] !== null && data[field] !== undefined) {
            if (!checkType(field, data[field], type)) {
                errors.push(`Field ${field} should be type ${formatType(type)}, got ${typeof data[field]}`);
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

export const Validators = {
    isJobListing(data: any): ValidationResult {
        return validateStructure(data, {
            job_id: 'string',
            title: 'string'
        }, {
            details: 'string', // Now optional
            job_details_url: 'string',
            job_summary: 'string',
            company_name: 'string',
            location: 'string',
            country_code: 'string',
            listing_date: 'string',
            salary_label: 'string',
            work_type: 'string',
            job_classification: 'string',
            job_sub_classification: 'string',
            work_arrangements: 'string'
        });
    },

    isJobWithDetails(data: any): ValidationResult {
        // Extends JobListing
        const listingValidation = this.isJobListing(data);
        if (!listingValidation.valid) return listingValidation;

        return validateStructure(data, {}, {
            status: 'string',
            is_expired: 'boolean',
            is_verified: 'boolean',
            expires_at: 'string'
        });
    },

    isJobStats(data: any): ValidationResult {
        return validateStructure(data, {
            total_jobs: 'number',
            new_jobs: 'number'
        });
    },

    isFavoriteJob(data: any): ValidationResult {
        const basicValidation = validateStructure(data, {
            id: ['string', 'number'],
            job_id: 'string'
        }, {
            created_at: 'string',
            notes: 'string'
        });

        if (!basicValidation.valid) return basicValidation;

        if (data.job) {
            const jobValidation = this.isJobListing(data.job);
            if (!jobValidation.valid) {
                return {
                    valid: false,
                    errors: jobValidation.errors.map(e => `Nested job error: ${e}`)
                };
            }
        }

        return { valid: true, errors: [] };
    },

    isFavoriteStatus(data: any): ValidationResult {
        return validateStructure(data, {
            is_favorited: 'boolean'
        }, {
            job_id: 'string'
        });
    }
};
