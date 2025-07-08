
import React, { useState } from 'react';
import { ReportCenter } from '../components/ReportCenter';
import { TaskCreationButton } from '../components/TaskCreationButton';
import { TaskCreationModal } from '../components/TaskCreationModal';
import { useTheme } from '../components/ThemeProvider';

export const Index: React.FC = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const { theme } = useTheme();

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    minHeight: '100vh',
    transition: 'margin-right 0.3s ease-in-out',
    marginRight: isTaskModalOpen ? '450px' : '0',
  };

  const headerSectionStyle: React.CSSProperties = {
    padding: '24px',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderBottom: `1px solid ${theme === 'dark' ? '#2d3748' : '#e2e8f0'}`,
    boxShadow: theme === 'dark'
      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
      : '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const toolbarStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: '700',
    color: theme === 'dark' ? '#ffffff' : '#1a202c',
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={headerSectionStyle}>
        <div style={toolbarStyle}>
          <h1 style={titleStyle}>Sentinel Dashboard</h1>
          <TaskCreationButton onClick={() => setIsTaskModalOpen(true)} />
        </div>
      </div>
      
      <ReportCenter />
      
      <TaskCreationModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
      />
    </div>
  );
};
