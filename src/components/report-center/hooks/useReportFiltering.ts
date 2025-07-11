import { useState, useMemo } from 'react';
import { Report } from '../../mockData';

export const useReportFiltering = (reports: Report[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState('');

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = !searchTerm || 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      
      const matchesDate = !dateFilter || 
        new Date(report.createdAt).toISOString().split('T')[0] >= dateFilter;
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [reports, searchTerm, statusFilter, dateFilter]);

  return {
    filteredReports,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter
  };
};