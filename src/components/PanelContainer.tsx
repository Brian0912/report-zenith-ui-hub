
import React from 'react';
import { TaskCreationPanel } from './TaskCreationPanel';
import { TaskLogsSidebar } from './TaskLogsSidebar';
import { Report } from './mockData';

interface PanelContainerProps {
  isTaskPanelOpen: boolean;
  selectedTask: Report | null;
  onTaskCreated: () => void;
  onCloseTaskPanel: () => void;
  onCloseLogsPanel: () => void;
}

export const PanelContainer: React.FC<PanelContainerProps> = ({
  isTaskPanelOpen,
  selectedTask,
  onTaskCreated,
  onCloseTaskPanel,
  onCloseLogsPanel
}) => {
  const panelContainerStyle: React.CSSProperties = {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
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

  return (
    <div style={panelContainerStyle}>
      <div style={panelHeaderStyle}>
        <h2 style={panelTitleStyle}>
          {isTaskPanelOpen ? 'Create New Task' : `Task Logs – ${selectedTask?.title}`}
        </h2>
        <button
          onClick={isTaskPanelOpen ? onCloseTaskPanel : onCloseLogsPanel}
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

      <div style={panelContentStyle}>
        {isTaskPanelOpen ? (
          <TaskCreationPanel onSuccess={onTaskCreated} />
        ) : selectedTask ? (
          <TaskLogsSidebar 
            task={selectedTask} 
            isOpen={true} 
            onClose={onCloseLogsPanel} 
          />
        ) : null}
      </div>
    </div>
  );
};
