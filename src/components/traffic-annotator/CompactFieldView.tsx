
import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { FieldData, ColumnVisibilityState } from './FieldAnalysisSection';
import { EnhancementBadge } from './EnhancementBadge';
import { FindingDisplay } from './FindingDropdown';
import { CommentDisplay } from './CommentDisplay';

interface CompactFieldViewProps {
  fields: FieldData[];
  columnVisibility: ColumnVisibilityState;
  selectedFields: FieldData[];
  onFieldToggle: (field: FieldData) => void;
  onEditField: (field: FieldData) => void;
  showSectionHeaders?: boolean;
}

export const CompactFieldView: React.FC<CompactFieldViewProps> = ({
  fields,
  columnVisibility,
  selectedFields,
  onFieldToggle,
  onEditField,
  showSectionHeaders = true
}) => {
  const renderSchemaIcon = (hasSchema: string) => {
    return hasSchema === 'Yes' ? 
      <CheckCircle size={16} color="hsl(var(--success))" /> : 
      <X size={16} color="hsl(var(--muted-foreground))" />;
  };

  const getVisibleColumns = () => {
    const columns = ['Field'];
    if (columnVisibility.group) columns.push('Group');
    if (columnVisibility.value) columns.push('Value');
    if (columnVisibility.hasSchema) columns.push('Has Schema');
    if (columnVisibility.prodTag) columns.push('Prod Tag');
    if (columnVisibility.gcpTag) columns.push('GCP Tag');
    if (columnVisibility.deccTag) columns.push('DECC Tag');
    if (columnVisibility.attributedTo) columns.push('Attributed To');
    if (columnVisibility.dataSovereignty) columns.push('Data Sovereignty');
    if (columnVisibility.policyAction) columns.push('Policy Action');
    if (columnVisibility.enhancements) columns.push('Enhancements');
    if (columnVisibility.finding) columns.push('Finding');
    if (columnVisibility.comment) columns.push('Comment');
    columns.push('Actions');
    return columns;
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    fontSize: '14px',
    borderCollapse: 'collapse'
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--muted) / 0.5)',
    borderBottom: '1px solid hsl(var(--border))',
    position: 'sticky',
    top: 0,
    zIndex: 10
  };

  const headerCellStyle: React.CSSProperties = {
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    color: 'hsl(var(--foreground))',
    whiteSpace: 'nowrap'
  };

  const getRowStyle = (isSelected: boolean): React.CSSProperties => ({
    borderBottom: '1px solid hsl(var(--border))',
    backgroundColor: isSelected ? 'hsl(var(--primary) / 0.05)' : '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  });

  const cellStyle: React.CSSProperties = {
    padding: '12px',
    verticalAlign: 'middle'
  };

  return (
    <div style={{ overflow: 'auto', maxHeight: '600px' }}>
      <table style={tableStyle}>
        <thead style={headerStyle}>
          <tr>
            {getVisibleColumns().map((column) => (
              <th key={column} style={headerCellStyle}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => {
            const isSelected = selectedFields.some(f => f.id === field.id);
            
            return (
              <tr
                key={field.id}
                style={getRowStyle(isSelected)}
                onClick={() => onFieldToggle(field)}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--muted) / 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                <td style={{ ...cellStyle, fontFamily: 'monospace', fontSize: '13px', color: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--foreground))', fontWeight: isSelected ? '600' : 'normal' }}>
                  {field.fieldPath}
                </td>
                
                {columnVisibility.group && (
                  <td style={cellStyle}>
                    <span style={{
                      backgroundColor: 'hsl(var(--muted))',
                      color: 'hsl(var(--foreground))',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '500'
                    }}>
                      {field.source} {field.category}
                    </span>
                  </td>
                )}
                
                {columnVisibility.value && (
                  <td style={{ ...cellStyle, maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {field.value || '-'}
                  </td>
                )}
                
                {columnVisibility.hasSchema && (
                  <td style={{ ...cellStyle, textAlign: 'center' }}>
                    {renderSchemaIcon(field.hasSchema)}
                  </td>
                )}
                
                {columnVisibility.prodTag && (
                  <td style={cellStyle}>
                    <span style={{
                      backgroundColor: field.prodTag === 'PII' ? 'hsl(var(--destructive) / 0.1)' : field.prodTag === 'Internal' ? 'hsl(var(--warning) / 0.1)' : 'hsl(var(--success) / 0.1)',
                      color: field.prodTag === 'PII' ? 'hsl(var(--destructive))' : field.prodTag === 'Internal' ? 'hsl(var(--warning))' : 'hsl(var(--success))',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {field.prodTag}
                    </span>
                  </td>
                )}
                
                {columnVisibility.gcpTag && (
                  <td style={cellStyle}>{field.gcpTag}</td>
                )}
                
                {columnVisibility.deccTag && (
                  <td style={cellStyle}>{field.deccTag}</td>
                )}
                
                {columnVisibility.attributedTo && (
                  <td style={{ ...cellStyle, fontFamily: 'monospace', fontSize: '13px' }}>
                    {field.attributedTo}
                  </td>
                )}
                
                {columnVisibility.dataSovereignty && (
                  <td style={cellStyle}>
                    <span style={{
                      backgroundColor: 'hsl(var(--muted))',
                      color: 'hsl(var(--foreground))',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      fontFamily: 'monospace'
                    }}>
                      {field.dataSovereignty}
                    </span>
                  </td>
                )}
                
                {columnVisibility.policyAction && (
                  <td style={cellStyle}>
                    <span style={{
                      backgroundColor: field.policyAction === 'noise' ? 'hsl(var(--destructive) / 0.1)' : field.policyAction === 'plain-text' ? 'hsl(var(--warning) / 0.1)' : 'hsl(var(--success) / 0.1)',
                      color: field.policyAction === 'noise' ? 'hsl(var(--destructive))' : field.policyAction === 'plain-text' ? 'hsl(var(--warning))' : 'hsl(var(--success))',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {field.policyAction}
                    </span>
                  </td>
                )}
                
                {columnVisibility.enhancements && (
                  <td style={{ ...cellStyle, minWidth: '150px' }}>
                    <EnhancementBadge enhancements={field.enhancements} />
                  </td>
                )}
                
                {columnVisibility.finding && (
                  <td style={{ ...cellStyle, minWidth: '200px' }}>
                    <FindingDisplay
                      findingId={field.selectedFinding}
                      onEdit={() => onEditField(field)}
                    />
                  </td>
                )}
                
                {columnVisibility.comment && (
                  <td style={{ ...cellStyle, minWidth: '250px' }}>
                    <CommentDisplay
                      comment={field.selectedComment}
                      onEdit={() => onEditField(field)}
                    />
                  </td>
                )}
                
                <td style={cellStyle}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFieldToggle(field);
                    }}
                    style={{
                      padding: '4px 8px',
                      fontSize: '12px',
                      backgroundColor: isSelected ? 'hsl(var(--destructive))' : 'hsl(var(--primary))',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    {isSelected ? 'Remove' : 'Select'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
