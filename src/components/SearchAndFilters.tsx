
import React from 'react';
import { useTheme } from './ThemeProvider';

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode
}) => {
  const { theme } = useTheme();

  const containerStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark'
      ? 'hsl(220 15% 9%)'
      : 'hsl(0 0% 100%)',
    border: `1px solid ${theme === 'dark' ? 'hsl(220 15% 18%)' : 'hsl(220 13% 91%)'}`,
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem'
  };

  const topRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap' as const
  };

  const searchInputStyle: React.CSSProperties = {
    flex: 1,
    minWidth: '300px',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: `1px solid ${theme === 'dark' ? 'hsl(220 15% 18%)' : 'hsl(220 13% 91%)'}`,
    backgroundColor: theme === 'dark'
      ? 'hsl(220 15% 7%)'
      : 'hsl(0 0% 100%)',
    color: theme === 'dark' ? 'hsl(220 15% 95%)' : 'hsl(220 15% 15%)',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    outline: 'none'
  };

  const filterButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: isActive
      ? 'hsl(221 83% 53%)'
      : (theme === 'dark' ? 'hsl(220 15% 12%)' : 'hsl(220 13% 97%)'),
    color: isActive 
      ? 'hsl(0 0% 98%)'
      : (theme === 'dark' ? 'hsl(220 15% 85%)' : 'hsl(220 15% 25%)'),
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
    backgroundColor: theme === 'dark'
      ? 'hsl(220 15% 12%)'
      : 'hsl(220 13% 97%)',
    borderRadius: '8px',
    padding: '4px',
    border: `1px solid ${theme === 'dark' ? 'hsl(220 15% 18%)' : 'hsl(220 13% 91%)'}`
  };

  const viewButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: isActive
      ? (theme === 'dark' ? 'hsl(220 15% 18%)' : 'hsl(0 0% 100%)')
      : 'transparent',
    color: theme === 'dark' ? 'hsl(220 15% 85%)' : 'hsl(220 15% 25%)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '0.875rem',
    fontWeight: '500'
  });

  const filtersRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap' as const,
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
            e.currentTarget.style.borderColor = 'hsl(221 83% 53%)';
            e.currentTarget.style.boxShadow = '0 0 0 3px hsl(221 83% 53% / 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = theme === 'dark' 
              ? 'hsl(220 15% 18%)'
              : 'hsl(220 13% 91%)';
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
          color: theme === 'dark' ? 'hsl(220 9% 65%)' : 'hsl(220 9% 46%)',
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
                e.currentTarget.style.backgroundColor = theme === 'dark'
                  ? 'hsl(220 15% 18%)'
                  : 'hsl(220 13% 94%)';
              }
            }}
            onMouseLeave={(e) => {
              if (statusFilter !== option.value) {
                e.currentTarget.style.backgroundColor = theme === 'dark'
                  ? 'hsl(220 15% 12%)'
                  : 'hsl(220 13% 97%)';
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
