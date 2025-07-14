
import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { SearchAndFilters } from './SearchAndFilters';
import { ReportGrid } from './ReportGrid';
import { TaskLogsSidebar } from './TaskLogsSidebar';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { FilterModal, FilterState } from './FilterModal';
import { mockReports, Report } from './mockData';

interface ReportCenterProps {
  isTaskModalOpen?: boolean;
  setIsTaskModalOpen?: (isOpen: boolean) => void;
}

const ReportCenterContent: React.FC<ReportCenterProps> = ({ 
  isTaskModalOpen = false, 
  setIsTaskModalOpen = () => {} 
}) => {
  const { theme } = useTheme();
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isLogsSidebarOpen, setIsLogsSidebarOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    selectedFilters: [],
    taskStatus: [],
    creators: [],
    tags: [],
    frequency: [],
    timeRange: { start: null, end: null }
  });

  const filteredReports = reports.filter(report => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    
    // Advanced filters from FilterModal
    const matchesAdvancedStatus = filterState.taskStatus.length === 0 || 
      filterState.taskStatus.includes(report.status);
    
    const matchesCreators = filterState.creators.length === 0 || 
      filterState.creators.includes(report.pointOfContact.name.toLowerCase().replace(' ', '-'));
    
    const matchesFrequency = filterState.frequency.length === 0 || 
      filterState.frequency.includes(report.schedule?.frequency?.toLowerCase() || 'monthly');
    
    // Date range filter
    let matchesDateRange = true;
    if (filterState.timeRange.start || filterState.timeRange.end) {
      const reportDate = new Date(report.lastUpdated);
      if (filterState.timeRange.start) {
        matchesDateRange = matchesDateRange && reportDate >= new Date(filterState.timeRange.start);
      }
      if (filterState.timeRange.end) {
        matchesDateRange = matchesDateRange && reportDate <= new Date(filterState.timeRange.end);
      }
    }
    
    return matchesSearch && matchesStatus && matchesAdvancedStatus && 
           matchesCreators && matchesFrequency && matchesDateRange;
  });

  const handleSubscribe = (reportId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, isSubscribed: !report.isSubscribed, subscriberCount: report.isSubscribed ? report.subscriberCount - 1 : report.subscriberCount + 1 }
        : report
    ));
  };

  const handleCreateTask = () => {
    setIsTaskModalOpen(true);
  };

  const handleViewLogs = (reportId: string) => {
    setSelectedTaskId(reportId);
    setIsLogsSidebarOpen(true);
  };

  const handleCloseLogs = () => {
    setIsLogsSidebarOpen(false);
    setSelectedTaskId(null);
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (filters: FilterState) => {
    setFilterState(filters);
    setIsFilterModalOpen(false);
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: 'hsl(var(--background))',
    transition: 'all 0.3s ease',
    position: 'relative',
    marginRight: isLogsSidebarOpen ? '600px' : '0'
  };

  const mainContentStyle: React.CSSProperties = {
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  };

  const selectedTask = selectedTaskId ? reports.find(r => r.id === selectedTaskId) : null;

  return (
    <div style={containerStyle}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header 
          onCreateTask={handleCreateTask}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onOpenFilters={handleOpenFilterModal}
        />
        <div style={mainContentStyle}>
          <SearchAndFilters 
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
          <ReportGrid 
            reports={filteredReports}
            onSubscribe={handleSubscribe}
            onViewLogs={handleViewLogs}
          />
        </div>
      </div>

      {isLogsSidebarOpen && selectedTask && (
        <TaskLogsSidebar
          task={selectedTask}
          isOpen={isLogsSidebarOpen}
          onClose={handleCloseLogs}
        />
      )}

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
        initialFilters={filterState}
      />
    </div>
  );
};

export const ReportCenter: React.FC<ReportCenterProps> = (props) => {
  return (
    <ThemeProvider>
      <ReportCenterContent {...props} />
    </ThemeProvider>
  );
};
