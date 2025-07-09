
import React from 'react';
import { useTheme } from '../ThemeProvider';

interface RiskFindingFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  submitterFilter: string;
  onSubmitterChange: (value: string) => void;
  dateRange: { start: string; end: string };
  onDateRangeChange: (range: { start: string; end: string }) => void;
}

export const RiskFindingFilters: React.FC<RiskFindingFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  submitterFilter,
  onSubmitterChange,
  dateRange,
  onDateRangeChange
}) => {
  const { theme } = useTheme();

  const containerStyle: React.CSSProperties = {
    background: 'hsl(var(--card))',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid hsl(var(--border))',
    marginBottom: '1.5rem'
  };

  const filtersGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    alignItems: 'end'
  };

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'hsl(var(--foreground))'
  };

  const inputStyle: React.CSSProperties = {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid hsl(var(--border))',
    background: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    outline: 'none'
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer'
  };

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'waiting_assignment', label: 'Waiting for Assignment' },
    { value: 'waiting_review', label: 'Waiting for Review' },
    { value: 'waiting_retest', label: 'Waiting for Retest' },
    { value: 'retesting', label: 'Retesting' },
    { value: 'closed', label: 'Closed' },
    { value: 'invalid_waiting', label: 'Invalid - Waiting' },
    { value: 'no_action_closed', label: 'No Action - Closed' }
  ];

  return (
    <div style={containerStyle}>
      <div style={filtersGridStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Search Findings</label>
          <input
            type="text"
            placeholder="Search by description, reporter, or domain..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = 'hsl(var(--ring))';
              e.target.style.boxShadow = '0 0 0 3px hsl(var(--ring) / 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'hsl(var(--border))';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            style={selectStyle}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Reporter</label>
          <input
            type="text"
            placeholder="Filter by reporter name..."
            value={submitterFilter}
            onChange={(e) => onSubmitterChange(e.target.value)}
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = 'hsl(var(--ring))';
              e.target.style.boxShadow = '0 0 0 3px hsl(var(--ring) / 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'hsl(var(--border))';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Date Range</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
              style={{ ...inputStyle, flex: 1 }}
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
