
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
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '2rem',
    border: theme === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: theme === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
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
    borderRadius: '12px',
    border: theme === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.2)'
      : '1px solid rgba(0, 0, 0, 0.2)',
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(255, 255, 255, 0.9)',
    color: theme === 'dark' ? '#F3F4F6' : '#374151',
    fontSize: '1rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none'
  };

  const filterButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: 'none',
    background: isActive
      ? (theme === 'dark' 
          ? 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)'
          : 'linear-gradient(135deg, #059669 0%, #0D9488 100%)')
      : (theme === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)'),
    color: isActive ? 'white' : (theme === 'dark' ? '#D1D5DB' : '#6B7280'),
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '0.875rem',
    fontWeight: '500'
  });

  const viewToggleStyle: React.CSSProperties = {
    display: 'flex',
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '4px'
  };

  const viewButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    border: 'none',
    background: isActive
      ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'white')
      : 'transparent',
    color: theme === 'dark' ? '#F3F4F6' : '#374151',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '0.875rem'
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
            e.currentTarget.style.borderColor = theme === 'dark' ? '#10B981' : '#059669';
            e.currentTarget.style.boxShadow = theme === 'dark' 
              ? '0 0 0 3px rgba(16, 185, 129, 0.1)'
              : '0 0 0 3px rgba(5, 150, 105, 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(0, 0, 0, 0.2)';
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
          color: theme === 'dark' ? '#D1D5DB' : '#6B7280',
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
                e.currentTarget.style.background = theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (statusFilter !== option.value) {
                e.currentTarget.style.background = theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)';
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
