'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { buttonVariants, paginationVariants, cn } from '@/styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={paginationVariants.container()}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonVariants({ intent: 'outline' })}
      >
        <ChevronLeft className={paginationVariants.icon()} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className={paginationVariants.ellipsis()}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={cn(buttonVariants({
              intent: 'outline',
              active: currentPage === page
            }))}
          >
            {page}
          </button>
        )
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonVariants({ intent: 'outline' })}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className={paginationVariants.icon()} />
      </button>
    </div>
  );
}
