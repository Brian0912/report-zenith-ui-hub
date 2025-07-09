
import React, { useState, useMemo } from 'react';
import { SentinelHeader } from '../components/SentinelHeader';
import { SearchAndFilters } from '../components/SearchAndFilters';
import { ReportGrid } from '../components/ReportGrid';
import { SlideOutPanel } from '../components/SlideOutPanel';
import { TaskCreationPanel } from '../components/TaskCreationPanel';
import { TaskLogsSidebar } from '../components/TaskLogsSidebar';
import { mockReports } from '../components/mockData';

export const Index: React.FC = () => {
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const mainContentStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px 24px',
    marginRight: (isTaskPanelOpen || selectedTaskId) ? '45%' : '0',
    transition: 'margin-right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: '600px'
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
    setIsTaskPanelOpen(false); // Close create task panel if open
  };

  const handleCreateTask = () => {
    setIsTaskPanelOpen(true);
    setSelectedTaskId(null); // Close logs panel if open
  };

  const handleCloseTaskPanel = () => {
    setIsTaskPanelOpen(false);
  };

  const handleCloseLogsPanel = () => {
    setSelectedTaskId(null);
  };

  const handleTaskCreated = () => {
    setIsTaskPanelOpen(false);
  };

  const selectedTask = selectedTaskId ? mockReports.find(r => r.id === selectedTaskId) : null;

  return (
    <div style={containerStyle}>
      <SentinelHeader 
        onCreateTask={handleCreateTask}
      />
      
      <div style={mainContentStyle}>        
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
      </div>

      {/* Create Task Panel */}
      {isTaskPanelOpen && (
        <SlideOutPanel
          isOpen={isTaskPanelOpen}
          onClose={handleCloseTaskPanel}
          title="Create New Task"
        >
          <TaskCreationPanel onSuccess={handleTaskCreated} />
        </SlideOutPanel>
      )}

      {/* Task Logs Panel */}
      {selectedTask && (
        <SlideOutPanel
          isOpen={!!selectedTask}
          onClose={handleCloseLogsPanel}
          title={`Task Logs - ${selectedTask.title}`}
        >
          <div style={{ height: '100%', overflow: 'auto' }}>
            <TaskLogsSidebar 
              task={selectedTask} 
              isOpen={true} 
              onClose={handleCloseLogsPanel} 
            />
          </div>
        </SlideOutPanel>
      )}
    </div>
  );
};
