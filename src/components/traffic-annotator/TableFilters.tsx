import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

export interface FilterState {
  fieldSearch: string;
  hasSchema: 'all' | 'yes' | 'no';
  policyAction: string;
  annotation: string;
}

interface TableFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  savedAnnotations: Array<{fields: any[], groupComment: any, timestamp: string, name?: string}>;
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  filters,
  onFiltersChange,
  savedAnnotations
}) => {
  const policyActions = ['All', 'encrypted', 'plain-text', 'noise', 'masked', 'hashed'];

  const handleFieldSearchChange = (value: string) => {
    onFiltersChange({ ...filters, fieldSearch: value });
  };

  const handleSchemaFilterChange = (checked: boolean) => {
    onFiltersChange({ 
      ...filters, 
      hasSchema: checked ? 'yes' : 'all'
    });
  };

  const handleAnnotationChange = (value: string) => {
    onFiltersChange({ ...filters, annotation: value });
  };

  const handlePolicyActionChange = (value: string) => {
    onFiltersChange({ ...filters, policyAction: value });
  };

  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      marginBottom: '16px',
      padding: '16px',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '8px'
    }}>
      {/* Field Search */}
      <div style={{ flex: '1', minWidth: '200px' }}>
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
          <Search 
            size={16} 
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }}
          />
          <input
            type="text"
            placeholder="Search field names..."
            value={filters.fieldSearch}
            onChange={(e) => handleFieldSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 8px 8px 36px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: '#ffffff'
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
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#374151'
        }}>
          <input
            type="checkbox"
            checked={filters.hasSchema === 'yes'}
            onChange={(e) => handleSchemaFilterChange(e.target.checked)}
            style={{
              width: '16px',
              height: '16px',
              accentColor: '#10b981'
            }}
          />
          Only with schema
        </label>
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
        <div style={{ position: 'relative' }}>
          <select
            value={filters.policyAction}
            onChange={(e) => handlePolicyActionChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 32px 8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: '#ffffff',
              appearance: 'none',
              cursor: 'pointer'
            }}
          >
            {policyActions.map(action => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
          <ChevronDown 
            size={16} 
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>

      {/* Annotation Filter */}
      <div style={{ minWidth: '150px' }}>
        <label style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '4px'
        }}>
          Annotation
        </label>
        <div style={{ position: 'relative' }}>
          <select
            value={filters.annotation}
            onChange={(e) => handleAnnotationChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 32px 8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: '#ffffff',
              appearance: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All</option>
            {savedAnnotations.map((annotation, index) => (
              <option key={index} value={annotation.name || `Annotation ${index + 1}`}>
                {annotation.name || `Annotation ${index + 1}`}
              </option>
            ))}
          </select>
          <ChevronDown 
            size={16} 
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};