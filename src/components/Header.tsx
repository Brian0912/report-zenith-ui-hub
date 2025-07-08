
import React from 'react';
import { useTheme } from './ThemeProvider';
import { TaskCreationButton } from './TaskCreationButton';

interface HeaderProps {
  onCreateTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateTask }) => {
  const { theme, toggleTheme } = useTheme();

  const headerStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'rgba(15, 15, 16, 0.8)'
      : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderBottom: theme === 'dark' 
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    padding: '1rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    background: theme === 'dark'
      ? 'linear-gradient(135deg, #10B981 0%, #14B8A6 50%, #3B82F6 100%)'
      : 'linear-gradient(135deg, #059669 0%, #0D9488 50%, #2563EB 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0
  };

  const themeToggleStyle: React.CSSProperties = {
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    color: theme === 'dark' ? '#F3F4F6' : '#374151',
    fontSize: '1.25rem'
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Report Center</h1>
        <div style={rightSectionStyle}>
          <TaskCreationButton onClick={onCreateTask} />
          <button
            style={themeToggleStyle}
            onClick={toggleTheme}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = theme === 'dark'
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = theme === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)';
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};
