
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import { Search, BarChart3 } from 'lucide-react';

interface HeaderProps {
  onCreateTask: () => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onCreateTask, 
  searchTerm = '', 
  onSearchChange 
}) => {
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

  const leftSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '500',
    color: 'hsl(var(--foreground))',
    margin: 0,
    letterSpacing: '-0.025em',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  const searchInputStyle: React.CSSProperties = {
    width: '320px',
    padding: '8px 12px 8px 36px',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    outline: 'none',
    transition: 'all 0.2s ease'
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '12px',
    color: 'hsl(var(--muted-foreground))',
    pointerEvents: 'none'
  };

  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={leftSectionStyle}>
          <h1 style={titleStyle}>
            <BarChart3 size={20} />
            Report Center
          </h1>
          
          {onSearchChange && (
            <div style={searchContainerStyle}>
              <Search size={16} style={searchIconStyle} />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                style={searchInputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = 'hsl(var(--ring))'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'hsl(var(--border))'}
              />
            </div>
          )}
        </div>
        
        <div style={rightSectionStyle}>
          <Button onClick={onCreateTask}>
            Create Task
          </Button>
        </div>
      </div>
    </header>
  );
};
