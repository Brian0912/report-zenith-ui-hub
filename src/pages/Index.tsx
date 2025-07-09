
import React, { useState, useMemo } from 'react';
import { SentinelHeader } from '../components/SentinelHeader';
import { CleanMetricsDashboard } from '../components/CleanMetricsDashboard';
import { SearchAndFilters } from '../components/SearchAndFilters';
import { ReportGrid } from '../components/ReportGrid';
import { TaskCreationModal } from '../components/TaskCreationModal';
import { TaskLogsSidebar } from '../components/TaskLogsSidebar';
import { mockReports } from '../components/mockData';

export const Index: React.FC = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#f8fafc'
  };

  const mainContentStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px 24px'
  };

  // Filter reports based on search and status
  const filteredReports = useMemo(() => {
    return mockReports.filter(report => {
      const matchesSearch = searchTerm === '' || 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === '' || report.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const handleSubscribe = (reportId: string) => {
    console.log('Subscribe to report:', reportId);
  };

  const handleViewLogs = (reportId: string) => {
    setSelectedTaskId(reportId);
  };

  const selectedTask = selectedTaskId ? mockReports.find(r => r.id === selectedTaskId) : null;

  return (
    <div style={containerStyle}>
      <SentinelHeader 
        onCreateTask={() => setIsTaskModalOpen(true)}
      />
      
      <div style={mainContentStyle}>
        <CleanMetricsDashboard reports={mockReports} />
        
        {dateFilter && (
          <SearchAndFilters 
            dateFilter={dateFilter} 
            setDateFilter={setDateFilter} 
          />
        )}
        
        <ReportGrid 
          reports={filteredReports} 
          onSubscribe={handleSubscribe} 
          onViewLogs={handleViewLogs} 
        />

        {isTaskModalOpen && (
          <TaskCreationModal 
            isOpen={isTaskModalOpen} 
            onClose={() => setIsTaskModalOpen(false)} 
          />
        )}

        {selectedTask && (
          <TaskLogsSidebar 
            task={selectedTask} 
            isOpen={true} 
            onClose={() => setSelectedTaskId(null)} 
          />
        )}
      </div>
    </div>
  );
};
