'use client';

import { headerVariants } from "@/styles";
import { useJobStats } from "@/hooks/use-jobs";

export function Header() {
  const { stats } = useJobStats();

  return (
    <header className={headerVariants.container()}>
      <div className={headerVariants.content()}>
        <div className={headerVariants.title()}>
          🔍 Jobs Dashboard
        </div>
        <div className={headerVariants.nav()}>
          <div className={headerVariants.statItem()}>
            <span className={headerVariants.statLabel()}>Total Jobs:</span>
            <span className={headerVariants.statValue()}>{stats?.total_jobs.toLocaleString() ?? 0}</span>
          </div>
          <div className={headerVariants.statItem()}>
            <span className={headerVariants.statLabel()}>New Today:</span>
            <span className={headerVariants.statValue()}>{stats?.new_jobs.toLocaleString() ?? 0}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
