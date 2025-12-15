import { render, screen, fireEvent } from '@testing-library/react';
import { JobCard } from '@/components/JobCard';
import { vi } from 'vitest';

// Mock the hooks
const mockAddFavorite = vi.fn();
const mockRemoveFavorite = vi.fn();

vi.mock('@/hooks/use-favorites', () => ({
    useAddFavorite: () => ({ addFavorite: mockAddFavorite }),
    useRemoveFavorite: () => ({ removeFavorite: mockRemoveFavorite }),
}));

describe('JobCard Interaction', () => {
    const mockJob = {
        job_id: '1',
        title: 'Software Engineer',
        company_name: 'Tech Corp',
        location: 'Remote',
        listing_date: '2023-10-01',
        job_summary: 'A great job',
        is_favorite: false,
        work_arrangements: 'Remote',
        salary_label: '$100k',
        job_details_url: 'http://example.com',
        country_code: 'US',
        job_classification: 'Engineering',
        job_sub_classification: 'Software',
        work_type: 'Full Time',
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly with initial favorite state', () => {
        render(<JobCard job={{ ...mockJob, is_favorite: true }} />);
        const button = screen.getByRole('button', { name: /remove from favorites/i });
        expect(button).toBeDefined();
    });

    it('calls addFavorite when clicked and currently not favorite', () => {
        render(<JobCard job={mockJob} />);
        const button = screen.getByRole('button', { name: /add to favorites/i });

        fireEvent.click(button);

        expect(mockAddFavorite).toHaveBeenCalledWith('1');
        expect(mockRemoveFavorite).not.toHaveBeenCalled();
    });

    it('calls removeFavorite when clicked and currently favorite', () => {
        render(<JobCard job={{ ...mockJob, is_favorite: true }} />);
        const button = screen.getByRole('button', { name: /remove from favorites/i });

        fireEvent.click(button);

        expect(mockRemoveFavorite).toHaveBeenCalledWith('1');
        expect(mockAddFavorite).not.toHaveBeenCalled();
    });

    it('stops propagation when clicking the favorite button', () => {
        const handleClick = vi.fn();
        render(
            <div onClick={handleClick}>
                <JobCard job={mockJob} />
            </div>
        );

        const button = screen.getByRole('button', { name: /add to favorites/i });
        fireEvent.click(button);

        expect(handleClick).not.toHaveBeenCalled();
    });
});
