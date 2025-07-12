
import React from 'react';
import { SearchAndFilters } from './SearchAndFilters';
import { ReportGrid } from './ReportGrid';
import { Report } from './mockData';

interface MainContentAreaProps {
  dateFilter: string;
  setDateFilter: (date: string) => void;
  filteredReports: Report[];
  onSubscribe: (reportId: string) => void;
  onViewLogs: (reportId: string) => void;
  heightMode?: 'viewport' | 'fill';
}

export const MainContentArea: React.FC<MainContentAreaProps> = ({
  dateFilter,
  setDateFilter,
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
      {dateFilter && (
        <SearchAndFilters 
          dateFilter={dateFilter} 
          setDateFilter={setDateFilter} 
        />
      )}
      
      <ReportGrid 
        reports={filteredReports} 
        onSubscribe={onSubscribe} 
        onViewLogs={onViewLogs} 
      />
    </div>
  );
};
