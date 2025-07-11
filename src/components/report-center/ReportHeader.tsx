import React from 'react';
import { Plus } from 'lucide-react';

interface ReportHeaderProps {
  onCreateTask: () => void;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({ onCreateTask }) => {
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 2rem 0',
    background: 'hsl(var(--background))',
    borderBottom: '1px solid hsl(var(--border))'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'hsl(var(--foreground))',
    margin: 0
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  };

  return (
    <div style={headerStyle}>
      <h1 style={titleStyle}>Report Center</h1>
      <button
        onClick={onCreateTask}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.9)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'hsl(var(--primary))';
        }}
      >
        <Plus size={16} />
        Create New Task
      </button>
    </div>
  );
};