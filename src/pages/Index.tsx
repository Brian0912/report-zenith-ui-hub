
import React from 'react';
import { SentinelHeader } from '../components/SentinelHeader';
import { MainContentArea } from '../components/MainContentArea';
import { PanelContainer } from '../components/PanelContainer';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../components/ui/resizable';
import { mockReports } from '../components/mockData';
import { useReportFilters } from '../hooks/useReportFilters';
import { usePanelState } from '../hooks/usePanelState';

export const Index: React.FC = () => {
  const {
    dateFilter,
    setDateFilter,
    filteredReports
  } = useReportFilters(mockReports);

  const {
    isTaskPanelOpen,
    selectedTask,
    isPanelOpen,
    handleCreateTask,
    handleCloseTaskPanel,
    handleCloseLogsPanel,
    handleTaskCreated,
    handleViewLogs
  } = usePanelState();

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const contentContainerStyle: React.CSSProperties = {
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '24px',
    height: 'calc(100vh - 80px - 48px)'
  };

  const handleSubscribe = (reportId: string) => {
    console.log('Subscribe to report:', reportId);
  };

  return (
    <div style={containerStyle}>
      <SentinelHeader onCreateTask={handleCreateTask} />
      
      <div style={contentContainerStyle}>
        {isPanelOpen ? (
          <ResizablePanelGroup direction="horizontal" style={{ height: '100%' }}>
            <ResizablePanel defaultSize={45} minSize={35} style={{ paddingRight: '12px' }}>
              <MainContentArea
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                filteredReports={filteredReports}
                onSubscribe={handleSubscribe}
                onViewLogs={handleViewLogs}
              />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={55} minSize={40} style={{ paddingLeft: '12px' }}>
              <PanelContainer
                isTaskPanelOpen={isTaskPanelOpen}
                selectedTask={selectedTask}
                onTaskCreated={handleTaskCreated}
                onCloseTaskPanel={handleCloseTaskPanel}
                onCloseLogsPanel={handleCloseLogsPanel}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <MainContentArea
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            filteredReports={filteredReports}
            onSubscribe={handleSubscribe}
            onViewLogs={handleViewLogs}
          />
        )}
      </div>

      <style>{`
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

        @media (max-width: 768px) {
          .resizable-panel-group {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
};
