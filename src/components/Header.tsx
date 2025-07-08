
import React from 'react';
import { useTheme } from './ThemeProvider';
import { TaskCreationButton } from './TaskCreationButton';

interface HeaderProps {
  onCreateTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateTask }) => {
  const { theme, toggleTheme } = useTheme();

  const headerStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark' 
      ? 'hsl(220 15% 9%)'
      : 'hsl(0 0% 100%)',
    borderBottom: `1px solid ${theme === 'dark' 
      ? 'hsl(220 15% 18%)'
      : 'hsl(220 13% 91%)'}`,
    padding: '1rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    transition: 'all 0.3s ease'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: theme === 'dark' ? 'hsl(220 15% 95%)' : 'hsl(220 15% 15%)',
    margin: 0
  };

  const themeToggleStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark'
      ? 'hsl(220 15% 12%)'
      : 'hsl(220 13% 97%)',
    border: `1px solid ${theme === 'dark' ? 'hsl(220 15% 18%)' : 'hsl(220 13% 91%)'}`,
    borderRadius: '8px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: theme === 'dark' ? 'hsl(220 15% 85%)' : 'hsl(220 15% 25%)',
    fontSize: '1.125rem'
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
              e.currentTarget.style.backgroundColor = theme === 'dark'
                ? 'hsl(220 15% 18%)'
                : 'hsl(220 13% 94%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'dark'
                ? 'hsl(220 15% 12%)'
                : 'hsl(220 13% 97%)';
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
