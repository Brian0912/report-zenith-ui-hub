
import React, { useState } from 'react';
import { Search, Filter, X, BarChart3 } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

interface HeaderProps {
  onCreateTask: () => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  statusFilter?: string;
  onStatusFilterChange?: (status: string) => void;
  onOpenFilters?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onCreateTask,
  searchTerm = '',
  onSearchChange = () => {},
  statusFilter = 'all',
  onStatusFilterChange = () => {},
  onOpenFilters = () => {}
}) => {
  const { theme } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
    margin: '0 auto',
    gap: '2rem'
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

  const searchSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
    maxWidth: '600px'
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative',
    flex: 1,
    maxWidth: '400px'
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px 8px 40px',
    border: `1px solid ${isSearchFocused ? 'hsl(var(--ring))' : 'hsl(var(--border))'}`,
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: isSearchFocused ? '0 0 0 3px hsl(var(--ring) / 0.1)' : 'none'
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'hsl(var(--muted-foreground))',
    pointerEvents: 'none'
  };

  const clearButtonStyle: React.CSSProperties = {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'hsl(var(--muted-foreground))',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    display: searchTerm ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const statusFilterStyle: React.CSSProperties = {
    padding: '8px 12px',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    cursor: 'pointer',
    outline: 'none',
    minWidth: '120px'
  };

  const filterButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease'
  };

  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>
          <BarChart3 size={24} />
          Report Center
        </h1>
        
        <div style={searchSectionStyle}>
          <div style={searchContainerStyle}>
            <Search size={16} style={searchIconStyle} />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              style={searchInputStyle}
            />
            <button
              onClick={handleClearSearch}
              style={clearButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <X size={14} />
            </button>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            style={statusFilterStyle}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="running">Running</option>
            <option value="queued">Queued</option>
            <option value="error">Failed</option>
          </select>

          <button
            onClick={onOpenFilters}
            style={filterButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--background))';
            }}
          >
            <Filter size={16} />
            Filters
          </button>
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
