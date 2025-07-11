
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
      const matchesDate = !filters.dateFilter || report.createdAt.includes(filters.dateFilter);
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [reports, filters]);
};
