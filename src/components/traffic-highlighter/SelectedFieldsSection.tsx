
import React from 'react';
import { sharedStyles } from '../shared/styles';
import { FieldData } from './CurlAnalysisPanel';

interface SelectedFieldsSectionProps {
  selectedFields: FieldData[];
  setSelectedFields: (fields: FieldData[]) => void;
}

export const SelectedFieldsSection: React.FC<SelectedFieldsSectionProps> = ({
  selectedFields,
  setSelectedFields
}) => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '12px',
    padding: '16px'
  };

  const headerStyle: React.CSSProperties = {
    ...sharedStyles.subheading,
    color: '#1e40af',
    marginBottom: '12px'
  };

  const fieldCardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '8px'
  };

  const removeField = (fieldToRemove: FieldData) => {
    setSelectedFields(selectedFields.filter(field => field.id !== fieldToRemove.id));
  };

  const getBadgeStyle = (type: 'source' | 'category', value: string): React.CSSProperties => {
    const baseStyle = {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-block'
    };

    if (type === 'source') {
      return {
        ...baseStyle,
        backgroundColor: value === 'Request' ? '#dcfce7' : '#e0e7ff',
        color: value === 'Request' ? '#166534' : '#3730a3'
      };
    } else {
      const colorMap: Record<string, { bg: string; text: string }> = {
        'Header': { bg: '#f3e8ff', text: '#6b21a8' },
        'Query': { bg: '#fed7aa', text: '#c2410c' },
        'Body': { bg: '#dbeafe', text: '#1e40af' },
        'Cookie': { bg: '#fce7f3', text: '#be185d' }
      };
      const colors = colorMap[value] || { bg: '#f3f4f6', text: '#374151' };
      return { ...baseStyle, backgroundColor: colors.bg, color: colors.text };
    }
  };

  const getPolicyColor = (action: string): React.CSSProperties => {
    const colorMap: Record<string, string> = {
      'Flagged': '#dc2626',
      'Review Required': '#d97706',
      'Pending': '#2563eb',
      'Approved': '#059669'
    };
    return { color: colorMap[action] || '#6b7280', fontWeight: '600' };
  };

  return (
    <div style={containerStyle}>
      <h3 style={headerStyle}>Selected Fields ({selectedFields.length})</h3>
      
      <div>
        {selectedFields.map((field) => (
          <div key={field.id} style={fieldCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1e40af'
                }}>
                  {field.fieldPath}
                </span>
                <span style={getBadgeStyle('source', field.source)}>{field.source}</span>
                <span style={getBadgeStyle('category', field.category)}>{field.category}</span>
              </div>
              <button
                onClick={() => removeField(field)}
                style={{
                  color: '#3b82f6',
                  fontSize: '14px',
                  fontWeight: '500',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#3b82f6'}
              >
                Remove
              </button>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '8px',
              fontSize: '12px'
            }}>
              <div>
                <span style={{ color: '#6b7280' }}>Policy: </span>
                <span style={getPolicyColor(field.policyAction)}>{field.policyAction}</span>
              </div>
              <div>
                <span style={{ color: '#6b7280' }}>Owner: </span>
                <span style={{ color: '#374151' }}>{field.attributedTo}</span>
              </div>
              <div>
                <span style={{ color: '#6b7280' }}>Sovereignty: </span>
                <span style={{ color: '#374151' }}>{field.dataSovereignty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
