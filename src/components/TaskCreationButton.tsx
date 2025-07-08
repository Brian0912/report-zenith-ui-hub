
import React from 'react';
import { Plus } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface TaskCreationButtonProps {
  onClick: () => void;
}

export const TaskCreationButton: React.FC<TaskCreationButtonProps> = ({ onClick }) => {
  const { theme } = useTheme();

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
      : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: theme === 'dark'
      ? '0 4px 12px rgba(59, 130, 246, 0.3)'
      : '0 4px 12px rgba(37, 99, 235, 0.3)',
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = theme === 'dark'
          ? '0 8px 20px rgba(59, 130, 246, 0.4)'
          : '0 8px 20px rgba(37, 99, 235, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = theme === 'dark'
          ? '0 4px 12px rgba(59, 130, 246, 0.3)'
          : '0 4px 12px rgba(37, 99, 235, 0.3)';
      }}
    >
      <Plus size={20} />
      Create New Task
    </button>
  );
};
