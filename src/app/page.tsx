'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { SearchBar } from '@/components/SearchBar';
import { JobList } from '@/components/JobList';
import { JobControls } from '@/components/JobControls';
import { Pagination } from '@/components/Pagination';
import { useJobs, useJobSearch, useJobStats } from '@/hooks/use-jobs';
import { JobLoadingState } from '@/components/skeletons/JobLoadingState';



export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sort, setSort] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    classification: '',
    subClassification: '',
    workArrangement: '',
  });

  // Calculate skip for pagination
  const skip = (currentPage - 1) * itemsPerPage;

  // Calculate active filters
  const isFiltering = filters.classification || filters.subClassification || filters.workArrangement;

  // If we are sorting by anything other than default 'recent' (server default), or filtering, we need to fetch all for client-side processing
  const isClientSideData = isFiltering || (sort !== 'recent');

  // conditional fetching based on search query
  const {
    jobs: filteredJobs,
    isLoading: isLoadingFiltered
  } = useJobs(searchQuery ? undefined : {
    job_classification: filters.classification,
    job_sub_classification: filters.subClassification,
    work_arrangements: filters.workArrangement,
    // If client-side processing needed (filtering or custom sort), fetch all (up to 1000)
    // Otherwise use server-side pagination
    skip: isClientSideData ? undefined : skip,
    limit: isClientSideData ? 1000 : itemsPerPage
  });

  const {
    results: searchResults,
    isLoading: isLoadingSearch
  } = useJobSearch(searchQuery);

  const { stats } = useJobStats();

  const handleSortChange = (value: string) => {
    setSort(value);
    setCurrentPage(1);
  };

  const sortJobs = (jobsToSort: any[]) => {
    // Create a copy to avoid mutating read-only arrays
    const sorted = [...jobsToSort];

    if (sort === 'company') {
      return sorted.sort((a, b) => (a.company_name || '').localeCompare(b.company_name || ''));
    }
    if (sort === 'recent') {
      // Sort by date descending
      const getTime = (d?: string) => d ? new Date(d).getTime() : 0;
      return sorted.sort((a, b) => getTime(b.listing_date) - getTime(a.listing_date));
    }
    // For 'relevance' or unknown, keep original order (which is usually relevance for search, or date for list)
    return sorted;
  };

  // Determine which data to show
  let jobs: any[] = [];
  let totalJobs = 0;
  let isLoading = false;

  if (searchQuery) {
    // Search Mode: client-side pagination
    // Search results typically come back by relevance. 
    // If user explicitly chose sort, we respect it.
    let allSearchJobs = searchResults;
    if (sort !== 'relevance') {
      allSearchJobs = sortJobs(searchResults);
    }

    jobs = allSearchJobs.slice(skip, skip + itemsPerPage);
    totalJobs = searchResults.length;
    isLoading = isLoadingSearch;
  } else if (isClientSideData) {
    // Filter Or Sort Mode: client-side pagination
    // filteredJobs contains all matching jobs (up to 1000)
    const sortedFilteredJobs = sortJobs(filteredJobs);

    jobs = sortedFilteredJobs.slice(skip, skip + itemsPerPage);
    totalJobs = filteredJobs.length;
    isLoading = isLoadingFiltered;
  } else {
    // Default Mode: server-side pagination
    // Server returns 'recent' by default for this mode
    jobs = filteredJobs;
    totalJobs = stats?.total_jobs || 0;
    isLoading = isLoadingFiltered;
  }

  const totalPages = Math.ceil(totalJobs / itemsPerPage);

  const handlePageSizeChange = (newSize: number) => {
    setItemsPerPage(newSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleClearFilters = () => {
    setFilters({
      classification: '',
      subClassification: '',
      workArrangement: '',
    });
    setSearchQuery('');
    setSort('recent'); // Reset sort too? Maybe.
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // When searching, default to relevance if currently 'recent' (which implies default list view)
    // But if user manually selected 'company', keep it?
    // Let's just switch to relevance if it's the first search character to be helpful, 
    // but typically we just let the user decide. 
    // Actually, widespread pattern is: Type search -> List updates. 
    // If I force sort change here it might be annoying.
    // However, if I search, 'recent' might be less useful than 'relevance'.
    if (value && sort === 'recent') {
      setSort('relevance');
    } else if (!value && sort === 'relevance') {
      setSort('recent');
    }

    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <Header />

      <div className="max-w-[1400px] mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <Sidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <main className="min-w-0">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <JobControls
            start={skip + 1}
            end={Math.min(skip + jobs.length, totalJobs)}
            total={totalJobs}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handlePageSizeChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sort={sort}
            onSortChange={handleSortChange}
          />

          {isLoading ? (
            <JobLoadingState viewMode={viewMode} />
          ) : (
            <>
              <JobList jobs={jobs} viewMode={viewMode} />

              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages > 0 ? totalPages : 1}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
