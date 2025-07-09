import React, { useState } from 'react';
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#f8fafc'
  };
  const mainContentStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px 24px'
  };
  const titleSectionStyle: React.CSSProperties = {
    marginBottom: '32px'
  };
  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
    marginBottom: '8px'
  };
  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#64748b',
    margin: 0
  };
  const handleSubscribe = (reportId: string) => {
    console.log('Subscribe to report:', reportId);
  };
  const handleViewLogs = (reportId: string) => {
    setSelectedTaskId(reportId);
  };
  const selectedTask = selectedTaskId ? mockReports.find(r => r.id === selectedTaskId) : null;
  return <div style={containerStyle}>
      <SentinelHeader onCreateTask={() => setIsTaskModalOpen(true)} />
      
      <div style={mainContentStyle}>
        <div style={titleSectionStyle}>
          
          
        </div>

        <CleanMetricsDashboard reports={mockReports} />
        <SearchAndFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} dateFilter={dateFilter} setDateFilter={setDateFilter} viewMode={viewMode} setViewMode={setViewMode} />
        <ReportGrid reports={mockReports} viewMode={viewMode} onSubscribe={handleSubscribe} onViewLogs={handleViewLogs} />

        {isTaskModalOpen && <TaskCreationModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />}

        {selectedTask && <TaskLogsSidebar task={selectedTask} isOpen={true} onClose={() => setSelectedTaskId(null)} />}
      </div>
    </div>;
};