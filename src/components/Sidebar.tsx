'use client';

import { sidebarVariants } from '@/styles';
import { useClassifications, useSubClassifications, useWorkArrangements } from '../hooks/use-jobs';

interface JobFilters {
  classification: string;
  subClassification: string;
  workArrangement: string;
}

interface SidebarProps {
  filters: JobFilters;
  onFilterChange: (key: keyof JobFilters, value: string) => void;
  onClearFilters: () => void;
}

export function Sidebar({ filters, onFilterChange, onClearFilters }: SidebarProps) {
  const { classifications } = useClassifications();
  const { subClassifications } = useSubClassifications();
  const { workArrangements } = useWorkArrangements();

  // Derive active filters for display
  const activeFilters = [
    filters.classification,
    filters.subClassification,
    filters.workArrangement
  ].filter(Boolean);

  const removeFilter = (filterValue: string) => {
    if (filters.classification === filterValue) onFilterChange('classification', '');
    if (filters.subClassification === filterValue) onFilterChange('subClassification', '');
    if (filters.workArrangement === filterValue) onFilterChange('workArrangement', '');
  };

  return (
    <aside className={sidebarVariants.container()}>
      <div className={sidebarVariants.header()}>
        <h2 className={sidebarVariants.title()}>Filters</h2>
        <button
          onClick={onClearFilters}
          className={sidebarVariants.clearButton()}
        >
          Clear all
        </button>
      </div>

      <div className={sidebarVariants.section()}>
        <div className={sidebarVariants.filterGroup()}>
          <label className={sidebarVariants.label()}>
            Job Classification
          </label>
          <select
            className={sidebarVariants.select()}
            value={filters.classification}
            onChange={(e) => onFilterChange('classification', e.target.value)}
          >
            <option value="">All Classifications</option>
            {classifications.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className={sidebarVariants.filterGroup()}>
          <label className={sidebarVariants.label()}>
            Sub-Classification
          </label>
          <select
            className={sidebarVariants.select()}
            value={filters.subClassification}
            onChange={(e) => onFilterChange('subClassification', e.target.value)}
          >
            <option value="">All Sub-Classifications</option>
            {subClassifications.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className={sidebarVariants.filterGroup()}>
          <label className={sidebarVariants.label()}>
            Work Arrangement
          </label>
          <select
            className={sidebarVariants.select()}
            value={filters.workArrangement}
            onChange={(e) => onFilterChange('workArrangement', e.target.value)}
          >
            <option value="">All Arrangements</option>
            {workArrangements.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {activeFilters.length > 0 && (
          <div className={sidebarVariants.activeFilters()}>
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className={sidebarVariants.chip()}
              >
                {filter}
                <button
                  onClick={() => removeFilter(filter)}
                  className={sidebarVariants.chipClose()}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
