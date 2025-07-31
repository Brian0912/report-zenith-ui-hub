import React from 'react';
import { Search } from 'lucide-react';

interface TableFiltersProps {
  fieldFilter: string;
  onFieldFilterChange: (value: string) => void;
  hasSchemaFilter: boolean | null;
  onHasSchemaFilterChange: (value: boolean | null) => void;
  policyActionFilter: string;
  onPolicyActionFilterChange: (value: string) => void;
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  fieldFilter,
  onFieldFilterChange,
  hasSchemaFilter,
  onHasSchemaFilterChange,
  policyActionFilter,
  onPolicyActionFilterChange
}) => {
  const policyActionOptions = ['All', 'encrypted', 'plain-text', 'noise', 'masked', 'hashed'];

  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      marginBottom: '16px',
      padding: '16px',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      flexWrap: 'wrap'
    }}>
      {/* Field Filter */}
      <div style={{ minWidth: '200px', flex: 1 }}>
        <label style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '4px'
        }}>
          Field
        </label>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6b7280'
          }} />
          <input
            type="text"
            value={fieldFilter}
            onChange={(e) => onFieldFilterChange(e.target.value)}
            placeholder="Search field names..."
            style={{
              width: '100%',
              padding: '8px 8px 8px 32px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Has Schema Filter */}
      <div style={{ minWidth: '120px' }}>
        <label style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '4px'
        }}>
          Has Schema
        </label>
        <select
          value={hasSchemaFilter === null ? 'all' : hasSchemaFilter ? 'yes' : 'no'}
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'all') {
              onHasSchemaFilterChange(null);
            } else {
              onHasSchemaFilterChange(value === 'yes');
            }
          }}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: '#ffffff',
            outline: 'none'
          }}
        >
          <option value="all">All</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {/* Policy Action Filter */}
      <div style={{ minWidth: '150px' }}>
        <label style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '4px'
        }}>
          Policy Action
        </label>
        <select
          value={policyActionFilter}
          onChange={(e) => onPolicyActionFilterChange(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: '#ffffff',
            outline: 'none'
          }}
        >
          {policyActionOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};