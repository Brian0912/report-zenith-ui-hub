
import React from 'react';
import { Plus } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

interface ReportCenterHeaderProps {
  onCreateTask: () => void;
}

export const ReportCenterHeader: React.FC<ReportCenterHeaderProps> = ({ onCreateTask }) => {
  const { theme } = useTheme();

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 0 1rem 0',
    borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: '700',
    color: theme === 'dark' ? '#F3F4F6' : '#111827',
    margin: 0
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: theme === 'dark' ? '#3B82F6' : '#2563EB',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Report Center</h1>
      <button
        onClick={onCreateTask}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2563EB' : '#1D4ED8';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#3B82F6' : '#2563EB';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <Plus size={16} />
        Create New Task
      </button>
    </header>
  );
};
