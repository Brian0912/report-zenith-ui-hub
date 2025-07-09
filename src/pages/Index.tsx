
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

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: 'hsl(var(--muted))'
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
    color: 'hsl(var(--foreground))',
    margin: 0,
    marginBottom: '8px'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: 'hsl(var(--muted-foreground))',
    margin: 0
  };

  return (
    <div style={containerStyle}>
      <SentinelHeader onCreateTask={() => setIsTaskModalOpen(true)} />
      
      <div style={mainContentStyle}>
        <div style={titleSectionStyle}>
          <h1 style={titleStyle}>Crystal Report Center</h1>
          <p style={subtitleStyle}>
            Comprehensive monitoring and reporting dashboard
          </p>
        </div>

        <CleanMetricsDashboard reports={mockReports} />
        <SearchAndFilters />
        <ReportGrid reports={mockReports} onReportClick={(id) => setSelectedTaskId(id)} />

        {isTaskModalOpen && (
          <TaskCreationModal onClose={() => setIsTaskModalOpen(false)} />
        )}

        {selectedTaskId && (
          <TaskLogsSidebar
            taskId={selectedTaskId}
            onClose={() => setSelectedTaskId(null)}
          />
        )}
      </div>
    </div>
  );
};
