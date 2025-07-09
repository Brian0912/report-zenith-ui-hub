
import React from 'react';
import { useTheme } from './ThemeProvider';

interface SearchAndFiltersProps {
  dateFilter: string;
  setDateFilter: (date: string) => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  dateFilter,
  setDateFilter
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

  const inputStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid hsl(var(--border))',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    maxWidth: '200px'
  };

  // Only show date filter if there are other filters to display
  // For now, this component is minimal since search and status are moved to header
  if (!dateFilter && !setDateFilter) {
    return null;
  }

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span style={{ 
          color: 'hsl(var(--muted-foreground))',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          Additional Filters:
        </span>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'hsl(var(--ring))';
            e.currentTarget.style.boxShadow = '0 0 0 3px hsl(var(--ring) / 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'hsl(var(--border))';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>
    </div>
  );
};
