import React from 'react';
import { CalendarDays, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Report } from './mockData';

interface SearchAndFiltersProps {
  dateFilter: string;
  setDateFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  reports: Report[];
  filteredReports: Report[];
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  dateFilter,
  setDateFilter,
  statusFilter,
  setStatusFilter,
  reports,
  filteredReports
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: 'hsl(var(--card))',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  };

  const filterSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const statusFilterStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem'
  };

  const statusButtonStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.375rem',
    backgroundColor: 'hsl(var(--secondary))',
    color: 'hsl(var(--secondary-foreground))',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'background-color 0.2s ease'
  };

  const dateFilterStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center'
  };

  const dateInputStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    border: '1px solid hsl(var(--border))',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))'
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '0.75rem',
    color: 'hsl(var(--muted-foreground))',
    pointerEvents: 'none'
  };

  const statusOptions = [
    { value: 'all', label: 'All Status', count: reports.length },
    { value: 'completed', label: 'Completed', count: reports.filter(r => r.status === 'completed').length },
    { value: 'running', label: 'Running', count: reports.filter(r => r.status === 'running').length },
    { value: 'queued', label: 'Queued', count: reports.filter(r => r.status === 'queued').length },
    { value: 'failed', label: 'Failed', count: reports.filter(r => r.status === 'failed').length }
  ];

  return (
    <div style={containerStyle}>
      <div style={filterSectionStyle}>
        <div style={statusFilterStyle}>
          {statusOptions.map(option => (
            <button
              key={option.value}
              style={{
                ...statusButtonStyle,
                backgroundColor: statusFilter === option.value ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
                color: statusFilter === option.value ? 'hsl(var(--primary-foreground))' : 'hsl(var(--secondary-foreground))'
              }}
              onClick={() => setStatusFilter(option.value)}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>
      </div>
      <div style={dateFilterStyle}>
        <CalendarDays size={16} style={iconStyle} />
        <input
          type="date"
          style={dateInputStyle}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>
    </div>
  );
};
