
import React, { useState } from 'react';
import { ReportCenter } from '../components/ReportCenter';
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

  return (
    <div style={containerStyle}>
      <ReportCenter 
        isTaskModalOpen={isTaskModalOpen}
        setIsTaskModalOpen={setIsTaskModalOpen}
      />
      
      <TaskCreationModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
      />
    </div>
  );
};
