
import React from 'react';

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  onSubmitFinding: () => void;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onSubmitFinding
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '24px',
    padding: '16px 0'
  };

  const leftSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '320px'
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 16px 10px 40px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white'
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6b7280',
    fontSize: '16px'
  };

  const filterIconStyle: React.CSSProperties = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6b7280',
    fontSize: '16px',
    cursor: 'pointer'
  };

  const filterSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const dropdownStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    fontSize: '14px',
    color: '#374151',
    cursor: 'pointer',
    minWidth: '120px'
  };

  const submitButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <div style={containerStyle}>
      <div style={leftSectionStyle}>
        <div style={searchContainerStyle}>
          <span style={searchIconStyle}>🔍</span>
          <input
            type="text"
            placeholder="Search findings..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={searchInputStyle}
          />
          <span style={filterIconStyle}>⚙️</span>
        </div>

        <div style={filterSectionStyle}>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            style={dropdownStyle}
          >
            <option value="">All Statuses</option>
            <option value="waiting_assignment">Waiting Assignment</option>
            <option value="waiting_review">Waiting Review</option>
            <option value="retesting">In Testing</option>
            <option value="closed">Closed</option>
          </select>

          <select style={dropdownStyle}>
            <option>All Categories</option>
            <option>Data Security</option>
            <option>Authentication</option>
            <option>Authorization</option>
          </select>
        </div>
      </div>

      <button 
        style={submitButtonStyle}
        onClick={onSubmitFinding}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#2563eb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#3b82f6';
        }}
      >
        <span>➕</span>
        Submit New Finding
      </button>
    </div>
  );
};
