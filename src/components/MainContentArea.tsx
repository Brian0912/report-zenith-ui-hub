
import React from 'react';
import { SearchAndFilters } from './SearchAndFilters';
import { ReportGrid } from './ReportGrid';
import { Report } from './mockData';

interface MainContentAreaProps {
  dateFilter: string;
  setDateFilter: (date: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  reports: Report[];
  filteredReports: Report[];
  onSubscribe: (reportId: string) => void;
  onViewLogs: (reportId: string) => void;
  heightMode?: 'viewport' | 'fill';
}

export const MainContentArea: React.FC<MainContentAreaProps> = ({
  dateFilter,
  setDateFilter,
  statusFilter,
  setStatusFilter,
  reports,
  filteredReports,
  onSubscribe,
  onViewLogs,
  heightMode = 'viewport'
}) => {
  const mainContentStyle: React.CSSProperties = {
    height: heightMode === 'viewport' ? 'calc(100vh - 80px - 48px)' : '100%',
    overflowY: 'auto',
    paddingRight: '8px'
  };

  return (
    <div style={mainContentStyle}>
      <SearchAndFilters 
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        reports={reports}
        filteredReports={filteredReports}
      />
      
      <ReportGrid 
        reports={filteredReports} 
        onSubscribe={onSubscribe} 
        onViewLogs={onViewLogs} 
      />
    </div>
  );
};
