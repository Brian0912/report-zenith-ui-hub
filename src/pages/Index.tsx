
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

  const selectedTask = selectedTaskId ? mockReports.find(r => r.id === selectedTaskId) : null;
  const isPanelOpen = isTaskPanelOpen || !!selectedTask;

  // Style constants for better maintainability
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const contentContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: isPanelOpen ? '24px' : '0',
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '24px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    alignItems: 'flex-start'
  };

  const mainContentStyle: React.CSSProperties = {
    flex: isPanelOpen ? '1 1 auto' : '1',
    minWidth: isPanelOpen ? '600px' : '0',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    height: 'calc(100vh - 80px - 48px)',
    overflowY: 'auto',
    paddingRight: '8px'
  };

  // Panel styles with fixed width and responsive behavior
  const panelContainerStyle: React.CSSProperties = {
    flex: '0 0 400px',
    maxWidth: '400px',
    minWidth: '400px',
    height: 'calc(100vh - 80px - 48px)',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'slideInFromRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'sticky',
    top: '24px'
  };

  const panelHeaderStyle: React.CSSProperties = {
    minHeight: '72px',
    maxHeight: '72px',
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden'
  };

  const panelTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a202c',
    margin: 0,
    lineHeight: '1.3',
    paddingRight: '16px',
    flex: 1,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#64748b',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    width: '36px',
    height: '36px',
    flexShrink: 0
  };

  const panelContentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    backgroundColor: '#f8fafc',
    padding: '0'
  };

  // Responsive styles
  const responsiveStyles = `
    @media (max-width: 1200px) {
      .panel-container {
        flex: 0 0 350px !important;
        max-width: 350px !important;
        min-width: 350px !important;
      }
    }
    
    @media (max-width: 768px) {
      .content-container {
        flex-direction: column !important;
        gap: 16px !important;
        padding: 16px !important;
      }
      
      .panel-container {
        flex: none !important;
        width: 100% !important;
        min-width: unset !important;
        max-width: unset !important;
        height: 60vh !important;
        position: fixed !important;
        top: 80px !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 1000 !important;
        border-radius: 16px 16px 0 0 !important;
        box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.15) !important;
      }
      
      .main-content {
        min-width: unset !important;
        height: auto !important;
      }
    }
  `;

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
    setIsTaskPanelOpen(false);
  };

  const handleCreateTask = () => {
    setIsTaskPanelOpen(true);
    setSelectedTaskId(null);
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

  return (
    <div style={containerStyle}>
      <SentinelHeader 
        onCreateTask={handleCreateTask}
      />
      
      <div style={contentContainerStyle} className="content-container">
        <div style={mainContentStyle} className="main-content">        
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

        {/* Fixed-width Panel */}
        {isPanelOpen && (
          <div style={panelContainerStyle} className="panel-container">
            {/* Enhanced Panel Header */}
            <div style={panelHeaderStyle}>
              <h2 style={panelTitleStyle}>
                {isTaskPanelOpen ? 'Create New Task' : `Task Logs – ${selectedTask?.title}`}
              </h2>
              <button
                onClick={isTaskPanelOpen ? handleCloseTaskPanel : handleCloseLogsPanel}
                style={closeButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.color = '#334155';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#64748b';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m18 6-12 12"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>

            {/* Panel Content */}
            <div style={panelContentStyle}>
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

        /* Enhanced scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        ${responsiveStyles}
      `}</style>
    </div>
  );
};
