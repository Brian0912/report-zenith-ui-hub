
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
  };

  const buttonContainerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '24px',
    right: '24px',
    zIndex: 999,
  };

  return (
    <div style={containerStyle}>
      <div style={buttonContainerStyle}>
        <TaskCreationButton onClick={() => setIsTaskModalOpen(true)} />
      </div>
      
      <ReportCenter />
      
      <TaskCreationModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
      />
    </div>
  );
};
