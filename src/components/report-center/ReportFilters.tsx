import React from 'react';
import { Search, Filter } from 'lucide-react';

interface ReportFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateFilter: string;
  setDateFilter: (date: string) => void;
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap'
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative',
    flex: '1',
    minWidth: '300px'
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    border: '1px solid hsl(var(--border))',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    outline: 'none'
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'hsl(var(--muted-foreground))',
    pointerEvents: 'none'
  };

  const selectStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    border: '1px solid hsl(var(--border))',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    cursor: 'pointer',
    outline: 'none'
  };

  return (
    <div style={containerStyle}>
      <div style={searchContainerStyle}>
        <Search size={16} style={searchIconStyle} />
        <input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </div>
      
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={selectStyle}
      >
        <option value="all">All Status</option>
        <option value="running">Running</option>
        <option value="completed">Completed</option>
        <option value="error">Error</option>
        <option value="queued">Queued</option>
      </select>

      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        style={selectStyle}
      />
    </div>
  );
};