
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

interface ReportFiltersProps {
  searchTerm: string;
  statusFilter: string;
  dateFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  searchTerm,
  statusFilter,
  dateFilter,
  onSearchChange,
  onStatusChange,
  onDateChange
}) => {
  const { theme } = useTheme();

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative',
    flex: '1',
    minWidth: '300px'
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
    fontSize: '0.875rem',
    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #D1D5DB',
    borderRadius: '0.5rem',
    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
    color: theme === 'dark' ? '#F3F4F6' : '#374151',
    outline: 'none'
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
    pointerEvents: 'none'
  };

  const selectStyle: React.CSSProperties = {
    padding: '0.75rem',
    fontSize: '0.875rem',
    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #D1D5DB',
    borderRadius: '0.5rem',
    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
    color: theme === 'dark' ? '#F3F4F6' : '#374151',
    outline: 'none',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <div style={searchContainerStyle}>
        <div style={searchIconStyle}>
          <Search size={16} />
        </div>
        <input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={searchInputStyle}
        />
      </div>
      
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        style={selectStyle}
      >
        <option value="all">All Status</option>
        <option value="completed">Completed</option>
        <option value="running">Running</option>
        <option value="error">Error</option>
        <option value="queued">Queued</option>
      </select>
      
      <input
        type="date"
        value={dateFilter}
        onChange={(e) => onDateChange(e.target.value)}
        style={selectStyle}
      />
    </div>
  );
};
