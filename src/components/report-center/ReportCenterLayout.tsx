import React, { useState } from 'react';
import { ReportHeader } from './ReportHeader';
import { ReportFilters } from './ReportFilters';
import { ReportGrid } from '../ReportGrid';
import { TaskLogsSidebar } from '../TaskLogsSidebar';
import { mockReports, Report } from '../mockData';
import { useReportFiltering } from './hooks/useReportFiltering';

interface ReportCenterLayoutProps {
  isTaskModalOpen?: boolean;
  setIsTaskModalOpen?: (isOpen: boolean) => void;
}

export const ReportCenterLayout: React.FC<ReportCenterLayoutProps> = ({ 
  isTaskModalOpen = false, 
  setIsTaskModalOpen = () => {} 
}) => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isLogsSidebarOpen, setIsLogsSidebarOpen] = useState(false);

  const {
    filteredReports,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter
  } = useReportFiltering(reports);

  const handleSubscribe = (reportId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            isSubscribed: !report.isSubscribed, 
            subscriberCount: report.isSubscribed ? report.subscriberCount - 1 : report.subscriberCount + 1 
          }
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

  const selectedTask = selectedTaskId ? reports.find(r => r.id === selectedTaskId) : null;

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

  return (
    <div style={containerStyle}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <ReportHeader onCreateTask={handleCreateTask} />
        <div style={mainContentStyle}>
          <ReportFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
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
    </div>
  );
};