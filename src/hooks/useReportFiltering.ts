
import { useMemo } from 'react';
import { Report } from '../components/mockData';

interface FilterOptions {
  searchTerm: string;
  statusFilter: string;
  dateFilter: string;
}

export const useReportFiltering = (reports: Report[], filters: FilterOptions) => {
  return useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           report.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesStatus = filters.statusFilter === 'all' || report.status === filters.statusFilter;
      
      // Fix date filtering - convert Date to string for comparison
      const matchesDate = !filters.dateFilter || 
        report.createdAt.toISOString().split('T')[0] === filters.dateFilter;
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [reports, filters]);
};
