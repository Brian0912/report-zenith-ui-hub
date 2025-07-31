import React from 'react';
import { ChevronLeft, ChevronRight, Eye, Edit2 } from 'lucide-react';
import { FieldData, ColumnVisibilityState } from './FieldAnalysisSection';
import { EnhancementBadge } from './EnhancementBadge';

interface PaginatedTableProps {
  fields: FieldData[];
  columnVisibility: ColumnVisibilityState;
  selectedFields: FieldData[];
  onFieldToggle: (field: FieldData) => void;
  onEditField: (field: FieldData) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (rows: number) => void;
  totalRows: number;
}

export const PaginatedTable: React.FC<PaginatedTableProps> = ({
  fields,
  columnVisibility,
  selectedFields,
  onFieldToggle,
  onEditField,
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  totalRows
}) => {
  const isFieldSelected = (field: FieldData) => {
    return selectedFields.some(f => f.id === field.id);
  };

  const renderCell = (field: FieldData, columnKey: keyof ColumnVisibilityState, content: React.ReactNode) => {
    if (!columnVisibility[columnKey]) return null;
    
    return (
      <td style={{
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        fontSize: '13px',
        color: '#374151',
        maxWidth: '200px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        {content}
      </td>
    );
  };

  const tableHeaderStyle: React.CSSProperties = {
    backgroundColor: '#f9fafb',
    fontWeight: '600',
    fontSize: '12px',
    color: '#374151',
    textAlign: 'left',
    padding: '12px 16px',
    borderBottom: '2px solid #e5e7eb'
  };

  const paginationButtonStyle: React.CSSProperties = {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const activePaginationButtonStyle: React.CSSProperties = {
    ...paginationButtonStyle,
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    borderColor: '#3b82f6'
  };

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>
                <input
                  type="checkbox"
                  checked={fields.length > 0 && fields.every(field => isFieldSelected(field))}
                  onChange={(e) => {
                    if (e.target.checked) {
                      fields.forEach(field => {
                        if (!isFieldSelected(field)) {
                          onFieldToggle(field);
                        }
                      });
                    } else {
                      fields.forEach(field => {
                        if (isFieldSelected(field)) {
                          onFieldToggle(field);
                        }
                      });
                    }
                  }}
                  style={{ marginRight: '8px' }}
                />
                Select
              </th>
              {columnVisibility.group && <th style={tableHeaderStyle}>Group</th>}
              <th style={tableHeaderStyle}>Field Path</th>
              {columnVisibility.value && <th style={tableHeaderStyle}>Value</th>}
              {columnVisibility.hasSchema && <th style={tableHeaderStyle}>Has Schema</th>}
              {columnVisibility.prodTag && <th style={tableHeaderStyle}>Prod Tag</th>}
              {columnVisibility.gcpTag && <th style={tableHeaderStyle}>GCP Tag</th>}
              {columnVisibility.deccTag && <th style={tableHeaderStyle}>DECC Tag</th>}
              {columnVisibility.attributedTo && <th style={tableHeaderStyle}>Attributed To</th>}
              {columnVisibility.dataSovereignty && <th style={tableHeaderStyle}>Data Sovereignty</th>}
              {columnVisibility.policyAction && <th style={tableHeaderStyle}>Policy Action</th>}
              {columnVisibility.enhancements && <th style={tableHeaderStyle}>Enhancements</th>}
              {columnVisibility.finding && <th style={tableHeaderStyle}>Finding</th>}
              {columnVisibility.comment && <th style={tableHeaderStyle}>Comment</th>}
              {columnVisibility.images && <th style={tableHeaderStyle}>Images</th>}
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <tr
                key={field.id}
                style={{
                  backgroundColor: isFieldSelected(field) ? '#eff6ff' : '#ffffff',
                  borderLeft: isFieldSelected(field) ? '3px solid #3b82f6' : '3px solid transparent'
                }}
              >
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <input
                    type="checkbox"
                    checked={isFieldSelected(field)}
                    onChange={() => onFieldToggle(field)}
                  />
                </td>
                {renderCell(field, 'group', `${field.source} ${field.category}`)}
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #e5e7eb',
                  fontSize: '13px',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  {field.fieldPath}
                </td>
                {renderCell(field, 'value', field.value)}
                {renderCell(field, 'hasSchema', field.hasSchema)}
                {renderCell(field, 'prodTag', field.prodTag)}
                {renderCell(field, 'gcpTag', field.gcpTag)}
                {renderCell(field, 'deccTag', field.deccTag)}
                {renderCell(field, 'attributedTo', field.attributedTo)}
                {renderCell(field, 'dataSovereignty', field.dataSovereignty)}
                {renderCell(field, 'policyAction', field.policyAction)}
                {renderCell(field, 'enhancements', 
                  <EnhancementBadge enhancements={field.enhancements} />
                )}
                {renderCell(field, 'finding', field.selectedFinding || '-')}
                {renderCell(field, 'comment', field.selectedComment?.text || '-')}
                {renderCell(field, 'images', 
                  field.selectedComment?.images?.length ? `${field.selectedComment.images.length} image(s)` : '-'
                )}
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <button
                    onClick={() => onEditField(field)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#f3f4f6',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Edit2 size={12} />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: '#374151' }}>
            Rows per page:
          </span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            style={{
              padding: '4px 8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: '#ffffff'
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>
            {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows}
          </span>
          
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                ...paginationButtonStyle,
                opacity: currentPage === 1 ? 0.5 : 1,
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  style={pageNum === currentPage ? activePaginationButtonStyle : paginationButtonStyle}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                ...paginationButtonStyle,
                opacity: currentPage === totalPages ? 0.5 : 1,
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};