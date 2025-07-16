
import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { FieldData, ColumnVisibilityState } from './FieldAnalysisSection';
import { EnhancementBadge } from './EnhancementBadge';
import { FindingDisplay } from './FindingDropdown';
import { ExpandableComment } from './ExpandableComment';
import { ImageUploadColumn } from './ImageUploadColumn';
import { ResizableTableHeader } from './ResizableTableHeader';

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
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    field: 200,
    group: 120,
    value: 150,
    hasSchema: 100,
    prodTag: 120,
    gcpTag: 100,
    deccTag: 100,
    attributedTo: 180,
    dataSovereignty: 120,
    policyAction: 120,
    enhancements: 150,
    existingFinding: 200,
    comment: 250,
    images: 120,
    actions: 100
  });

  const updateColumnWidth = (column: string, width: number) => {
    setColumnWidths(prev => ({
      ...prev,
      [column]: width
    }));
  };

  const renderSchemaIcon = (hasSchema: string) => {
    return hasSchema === 'Yes' ? 
      <CheckCircle size={16} color="#10B981" /> : 
      <X size={16} color="#6b7280" />;
  };

  const getVisibleColumns = () => {
    const columns = [
      { key: 'field', label: 'Field', visible: true },
      { key: 'group', label: 'Group', visible: columnVisibility.group },
      { key: 'value', label: 'Value', visible: columnVisibility.value },
      { key: 'hasSchema', label: 'Has Schema', visible: columnVisibility.hasSchema },
      { key: 'prodTag', label: 'Prod Tag', visible: columnVisibility.prodTag },
      { key: 'gcpTag', label: 'GCP Tag', visible: columnVisibility.gcpTag },
      { key: 'deccTag', label: 'DECC Tag', visible: columnVisibility.deccTag },
      { key: 'attributedTo', label: 'Attributed To', visible: columnVisibility.attributedTo },
      { key: 'dataSovereignty', label: 'Data Sovereignty', visible: columnVisibility.dataSovereignty },
      { key: 'policyAction', label: 'Policy Action', visible: columnVisibility.policyAction },
      { key: 'enhancements', label: 'Enhancements', visible: columnVisibility.enhancements },
      { key: 'existingFinding', label: 'Existing Finding', visible: columnVisibility.finding },
      { key: 'comment', label: 'Comment', visible: columnVisibility.comment },
      { key: 'images', label: 'Images', visible: columnVisibility.images },
      { key: 'actions', label: 'Actions', visible: true }
    ];
    return columns.filter(col => col.visible);
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    fontSize: '14px',
    borderCollapse: 'collapse'
  };

  const getRowStyle = (isSelected: boolean): React.CSSProperties => ({
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: isSelected ? '#EEF2FF' : '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  });

  const cellStyle: React.CSSProperties = {
    padding: '12px',
    verticalAlign: 'middle',
    borderRight: '1px solid #f3f4f6'
  };

  const visibleColumns = getVisibleColumns();

  return (
    <div style={{ overflow: 'auto', maxHeight: '600px' }}>
      <table style={tableStyle}>
        <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
          <tr>
            {visibleColumns.map((column) => (
              <ResizableTableHeader
                key={column.key}
                width={columnWidths[column.key]}
                onResize={(width) => updateColumnWidth(column.key, width)}
              >
                {column.label}
              </ResizableTableHeader>
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
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                {visibleColumns.map((column) => {
                  const style = { 
                    ...cellStyle, 
                    width: `${columnWidths[column.key]}px`,
                    minWidth: `${columnWidths[column.key]}px`
                  };

                  switch (column.key) {
                    case 'field':
                      return (
                        <td key={column.key} style={{ ...style, fontFamily: 'monospace', fontSize: '13px', color: isSelected ? '#4F46E5' : '#1a202c', fontWeight: isSelected ? '600' : 'normal' }}>
                          {field.fieldPath}
                        </td>
                      );
                    
                    case 'group':
                      return (
                        <td key={column.key} style={style}>
                          <span style={{
                            backgroundColor: '#F3F4F6',
                            color: '#1a202c',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            {field.source} {field.category}
                          </span>
                        </td>
                      );
                    
                    case 'value':
                      return (
                        <td key={column.key} style={{ ...style, maxWidth: `${columnWidths[column.key]}px`, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {field.value || '-'}
                        </td>
                      );
                    
                    case 'hasSchema':
                      return (
                        <td key={column.key} style={{ ...style, textAlign: 'center' }}>
                          {renderSchemaIcon(field.hasSchema)}
                        </td>
                      );
                    
                    case 'prodTag':
                      return (
                        <td key={column.key} style={style}>
                          <span style={{
                            backgroundColor: field.prodTag === 'PII' ? '#FEF2F2' : field.prodTag === 'Internal' ? '#FEF3C7' : '#F0FDF4',
                            color: field.prodTag === 'PII' ? '#DC2626' : field.prodTag === 'Internal' ? '#D97706' : '#16A34A',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {field.prodTag}
                          </span>
                        </td>
                      );
                    
                    case 'gcpTag':
                      return <td key={column.key} style={style}>{field.gcpTag}</td>;
                    
                    case 'deccTag':
                      return <td key={column.key} style={style}>{field.deccTag}</td>;
                    
                    case 'attributedTo':
                      return (
                        <td key={column.key} style={{ ...style, fontFamily: 'monospace', fontSize: '13px' }}>
                          {field.attributedTo}
                        </td>
                      );
                    
                    case 'dataSovereignty':
                      return (
                        <td key={column.key} style={style}>
                          <span style={{
                            backgroundColor: '#F3F4F6',
                            color: '#1a202c',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            fontFamily: 'monospace'
                          }}>
                            {field.dataSovereignty}
                          </span>
                        </td>
                      );
                    
                    case 'policyAction':
                      return (
                        <td key={column.key} style={style}>
                          <span style={{
                            backgroundColor: field.policyAction === 'noise' ? '#FEF2F2' : field.policyAction === 'plain-text' ? '#FEF3C7' : '#F0FDF4',
                            color: field.policyAction === 'noise' ? '#DC2626' : field.policyAction === 'plain-text' ? '#D97706' : '#16A34A',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {field.policyAction}
                          </span>
                        </td>
                      );
                    
                    case 'enhancements':
                      return (
                        <td key={column.key} style={style}>
                          <EnhancementBadge enhancements={field.enhancements} />
                        </td>
                      );
                    
                    case 'existingFinding':
                      return (
                        <td key={column.key} style={style}>
                          <FindingDisplay
                            findingId={field.selectedFinding}
                            onEdit={() => onEditField(field)}
                          />
                        </td>
                      );
                    
                    case 'comment':
                      return (
                        <td key={column.key} style={style}>
                          <ExpandableComment
                            comment={field.selectedComment}
                            onEdit={() => onEditField(field)}
                          />
                        </td>
                      );
                    
                    case 'images':
                      return (
                        <td key={column.key} style={style}>
                          <ImageUploadColumn
                            images={field.images || []}
                            onImagesChange={(images) => {
                              // Handle image change
                              console.log('Images updated for field:', field.id, images);
                            }}
                          />
                        </td>
                      );
                    
                    case 'actions':
                      return (
                        <td key={column.key} style={style}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onFieldToggle(field);
                            }}
                            style={{
                              padding: '4px 8px',
                              fontSize: '12px',
                              backgroundColor: isSelected ? '#DC2626' : '#4F46E5',
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
                      );
                    
                    default:
                      return <td key={column.key} style={style}>-</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
