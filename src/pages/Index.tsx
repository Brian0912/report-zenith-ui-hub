
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
    backgroundColor: '#fafafa',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const contentContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '32px',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px 24px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const mainContentStyle: React.CSSProperties = {
    flex: 1,
    minWidth: '0', // Prevents flex item from overflowing
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
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
  const isPanelOpen = isTaskPanelOpen || !!selectedTask;

  return (
    <div style={containerStyle}>
      <SentinelHeader 
        onCreateTask={handleCreateTask}
      />
      
      <div style={contentContainerStyle}>
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

        {/* Embedded Card Panel */}
        {isPanelOpen && (
          <div style={{
            width: '520px',
            minWidth: '480px',
            maxWidth: '560px',
            height: 'calc(100vh - 80px - 64px)', // Full height minus header and padding
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.10)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideInFromRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'sticky',
            top: '32px'
          }}>
            {/* Panel Header */}
            <div style={{
              padding: '32px 32px 24px 32px',
              borderBottom: '1px solid #f0f0f0',
              backgroundColor: '#ffffff',
              position: 'sticky',
              top: 0,
              zIndex: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#1a202c',
                margin: 0,
                lineHeight: '1.2',
                paddingRight: '16px'
              }}>
                {isTaskPanelOpen ? 'Create New Task' : `Task Logs – ${selectedTask?.title}`}
              </h2>
              <button
                onClick={isTaskPanelOpen ? handleCloseTaskPanel : handleCloseLogsPanel}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#718096',
                  padding: '8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  width: '36px',
                  height: '36px',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m18 6-12 12"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>

            {/* Panel Content */}
            <div style={{
              flex: 1,
              overflow: 'auto',
              backgroundColor: '#fafafa'
            }}>
              {isTaskPanelOpen ? (
                <TaskCreationPanel onSuccess={handleTaskCreated} />
              ) : selectedTask ? (
                <TaskLogsSidebar 
                  task={selectedTask} 
                  isOpen={true} 
                  onClose={handleCloseLogsPanel} 
                />
              ) : null}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .content-container {
            flex-direction: column !important;
            gap: 24px !important;
          }
          
          .panel-card {
            width: 100% !important;
            min-width: unset !important;
            max-width: unset !important;
            height: auto !important;
            position: static !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};
