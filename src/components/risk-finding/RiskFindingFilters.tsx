
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
    background: theme === 'dark' 
      ? 'rgba(30, 41, 59, 0.8)'
      : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '24px',
    border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    boxShadow: theme === 'dark' 
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
    marginBottom: '24px'
  };

  const filtersGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    alignItems: 'end'
  };

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: theme === 'dark' ? '#e2e8f0' : '#374151'
  };

  const inputStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderRadius: '8px',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#d1d5db'}`,
    background: theme === 'dark' ? '#0f172a' : '#ffffff',
    color: theme === 'dark' ? '#f1f5f9' : '#374151',
    fontSize: '14px',
    transition: 'all 0.3s ease',
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
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme === 'dark' ? '#475569' : '#d1d5db';
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
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme === 'dark' ? '#475569' : '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Date Range</label>
          <div style={{ display: 'flex', gap: '8px' }}>
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
