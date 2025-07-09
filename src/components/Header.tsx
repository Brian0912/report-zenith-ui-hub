
import React from 'react';
import { useTheme } from './ThemeProvider';
import { TaskCreationButton } from './TaskCreationButton';

interface HeaderProps {
  onCreateTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateTask }) => {
  const { theme, toggleTheme } = useTheme();

  const headerStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--background))',
    borderBottom: '1px solid hsl(var(--border))',
    padding: '1rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(8px)',
    backgroundColor: theme === 'dark' 
      ? 'hsl(var(--background) / 0.95)'
      : 'hsl(var(--background) / 0.95)'
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'hsl(var(--foreground))',
    margin: 0
  };

  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const themeToggleStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--secondary))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '6px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: 'hsl(var(--secondary-foreground))',
    fontSize: '1rem'
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
              e.currentTarget.style.backgroundColor = 'hsl(var(--accent))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--secondary))';
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
