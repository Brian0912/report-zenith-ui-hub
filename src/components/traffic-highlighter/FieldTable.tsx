
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { FieldData } from './CurlAnalysisPanel';

interface FieldTableProps {
  data: FieldData[];
  selectedFields: FieldData[];
  onToggleField: (field: FieldData) => void;
}

export const FieldTable: React.FC<FieldTableProps> = ({
  data,
  selectedFields,
  onToggleField
}) => {
  const tableStyle: React.CSSProperties = {
    width: '100%',
    fontSize: '14px',
    borderCollapse: 'collapse'
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb'
  };

  const headerCellStyle: React.CSSProperties = {
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#374151',
    whiteSpace: 'nowrap'
  };

  const getRowStyle = (isSelected: boolean): React.CSSProperties => ({
    borderBottom: '1px solid #f3f4f6',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    backgroundColor: isSelected ? '#eff6ff' : 'transparent'
  });

  const cellStyle: React.CSSProperties = {
    padding: '12px',
    color: '#374151'
  };

  const getBadgeStyle = (value: string, type: 'prodTag' | 'policyAction'): React.CSSProperties => {
    const baseStyle = {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-block'
    };

    if (type === 'prodTag') {
      const colorMap: Record<string, { bg: string; text: string }> = {
        'PII': { bg: '#fef2f2', text: '#dc2626' },
        'Internal': { bg: '#fefbf2', text: '#d97706' },
        'Public': { bg: '#f0fdf4', text: '#059669' }
      };
      const colors = colorMap[value] || { bg: '#f3f4f6', text: '#6b7280' };
      return { ...baseStyle, backgroundColor: colors.bg, color: colors.text };
    } else {
      const colorMap: Record<string, { bg: string; text: string }> = {
        'Flagged': { bg: '#fef2f2', text: '#dc2626' },
        'Review Required': { bg: '#fefbf2', text: '#d97706' },
        'Pending': { bg: '#eff6ff', text: '#2563eb' },
        'Approved': { bg: '#f0fdf4', text: '#059669' }
      };
      const colors = colorMap[value] || { bg: '#f3f4f6', text: '#6b7280' };
      return { ...baseStyle, backgroundColor: colors.bg, color: colors.text };
    }
  };

  const headers = [
    'Field',
    'Has Schema',
    'Prod Tag',
    'GPCP Tag',
    'DECC Tag',
    'Attributed To',
    'Data Sovereignty',
    'Policy Action',
    'Link to Finding',
    'Comment'
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyle}>
        <thead style={headerStyle}>
          <tr>
            {headers.map((header) => (
              <th key={header} style={headerCellStyle}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((field) => {
            const isSelected = selectedFields.some(f => f.id === field.id);
            
            return (
              <tr
                key={field.id}
                onClick={() => onToggleField(field)}
                style={getRowStyle(isSelected)}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <td style={{
                  ...cellStyle,
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                  fontWeight: isSelected ? '600' : '400',
                  color: isSelected ? '#1e40af' : '#374151'
                }}>
                  {field.fieldPath}
                </td>
                <td style={cellStyle}>{field.hasSchema}</td>
                <td style={cellStyle}>
                  <span style={getBadgeStyle(field.prodTag, 'prodTag')}>
                    {field.prodTag}
                  </span>
                </td>
                <td style={cellStyle}>{field.gcpTag}</td>
                <td style={cellStyle}>{field.deccTag}</td>
                <td style={cellStyle}>{field.attributedTo}</td>
                <td style={cellStyle}>{field.dataSovereignty}</td>
                <td style={cellStyle}>
                  <span style={getBadgeStyle(field.policyAction, 'policyAction')}>
                    {field.policyAction}
                  </span>
                </td>
                <td style={cellStyle}>
                  <a
                    href={field.linkToFinding}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#3b82f6',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: '500',
                      transition: 'color 0.2s ease'
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#3b82f6'}
                  >
                    View
                    <ExternalLink size={12} />
                  </a>
                </td>
                <td style={cellStyle}>{field.comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
