
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

interface HeaderProps {
  onCreateTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateTask }) => {
  const { theme } = useTheme();

  const headerStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--background) / 0.98)',
    borderBottom: '1px solid hsl(var(--border) / 0.1)',
    padding: '1rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)'
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
    fontWeight: '500',
    color: 'hsl(var(--foreground))',
    margin: 0,
    letterSpacing: '-0.025em'
  };

  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Report Center</h1>
        <div style={rightSectionStyle}>
          <Button onClick={onCreateTask}>
            Create Task
          </Button>
        </div>
      </div>
    </header>
  );
};
