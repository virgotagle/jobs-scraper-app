'use client';

import { Search } from 'lucide-react';
import { inputVariants } from '@/styles';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={inputVariants.container()}>
      <div className={inputVariants.wrapper()}>
        <Search className={inputVariants.icon()} />
        <input
          type="text"
          className={inputVariants.field()}
          placeholder="Search by job title, company, location, or keywords..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
