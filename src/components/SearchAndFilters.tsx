import React from 'react';
import { useTheme } from './ThemeProvider';

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateFilter: string;
  setDateFilter: (date: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  viewMode,
  setViewMode
}) => {
  const { theme } = useTheme();

  const containerStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const topRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap'
  };

  const searchInputStyle: React.CSSProperties = {
    flex: 1,
    minWidth: '300px',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid hsl(var(--border))',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    outline: 'none'
  };

  const filterButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid hsl(var(--border))',
    backgroundColor: isActive ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
    color: isActive ? 'hsl(var(--primary-foreground))' : 'hsl(var(--secondary-foreground))',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  });

  const viewToggleStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: 'hsl(var(--secondary))',
    borderRadius: '8px',
    padding: '4px',
    border: '1px solid hsl(var(--border))'
  };

  const viewButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: isActive ? 'hsl(var(--background))' : 'transparent',
    color: 'hsl(var(--foreground))',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '0.875rem',
    fontWeight: '500',
    boxShadow: isActive ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
  });

  const filtersRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    alignItems: 'center'
  };

  const statusOptions = [
    { value: 'all', label: 'All Status', icon: '📋' },
    { value: 'completed', label: 'Completed', icon: '✅' },
    { value: 'running', label: 'Running', icon: '⚡' },
    { value: 'error', label: 'Error', icon: '🚨' },
    { value: 'queued', label: 'Queued', icon: '⏳' }
  ];

  return (
    <div style={containerStyle}>
      <div style={topRowStyle}>
        <input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'hsl(var(--ring))';
            e.currentTarget.style.boxShadow = '0 0 0 3px hsl(var(--ring) / 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'hsl(var(--border))';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <div style={viewToggleStyle}>
          <button
            style={viewButtonStyle(viewMode === 'grid')}
            onClick={() => setViewMode('grid')}
          >
            🎛️ Grid
          </button>
          <button
            style={viewButtonStyle(viewMode === 'list')}
            onClick={() => setViewMode('list')}
          >
            📋 List
          </button>
        </div>
      </div>
      <div style={filtersRowStyle}>
        <span style={{ 
          color: 'hsl(var(--muted-foreground))',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          Filter by status:
        </span>
        {statusOptions.map(option => (
          <button
            key={option.value}
            style={filterButtonStyle(statusFilter === option.value)}
            onClick={() => setStatusFilter(option.value)}
            onMouseEnter={(e) => {
              if (statusFilter !== option.value) {
                e.currentTarget.style.backgroundColor = 'hsl(var(--accent))';
              }
            }}
            onMouseLeave={(e) => {
              if (statusFilter !== option.value) {
                e.currentTarget.style.backgroundColor = 'hsl(var(--secondary))';
              }
            }}
          >
            {option.icon} {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
