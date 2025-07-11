
import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Report } from '../mockData';
import { ReportCenterHeader } from './ReportCenterHeader';
import { ReportFilters } from './ReportFilters';
import { ReportGrid } from '../ReportGrid';
import { TaskLogsSidebar } from '../TaskLogsSidebar';
import { useReportFiltering } from '../../hooks/useReportFiltering';

interface ReportCenterLayoutProps {
  reports: Report[];
  onSubscribe: (reportId: string) => void;
  onCreateTask: () => void;
}

export const ReportCenterLayout: React.FC<ReportCenterLayoutProps> = ({
  reports,
  onSubscribe,
  onCreateTask
}) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isLogsSidebarOpen, setIsLogsSidebarOpen] = useState(false);

  const filteredReports = useReportFiltering(reports, {
    searchTerm,
    statusFilter,
    dateFilter
  });

  const handleViewLogs = (reportId: string) => {
    setSelectedTaskId(reportId);
    setIsLogsSidebarOpen(true);
  };

  const handleCloseLogs = () => {
    setIsLogsSidebarOpen(false);
    setSelectedTaskId(null);
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
    margin: '0 auto'
  };

  const selectedTask = selectedTaskId ? reports.find(r => r.id === selectedTaskId) : null;

  return (
    <div style={containerStyle}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={mainContentStyle}>
          <ReportCenterHeader onCreateTask={onCreateTask} />
          
          <ReportFilters
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            dateFilter={dateFilter}
            onSearchChange={setSearchTerm}
            onStatusChange={setStatusFilter}
            onDateChange={setDateFilter}
          />
          
          <ReportGrid 
            reports={filteredReports}
            onSubscribe={onSubscribe}
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
    </div>
  );
};
