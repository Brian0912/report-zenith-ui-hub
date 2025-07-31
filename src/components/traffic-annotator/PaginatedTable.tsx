import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { FieldData, ColumnVisibilityState } from './FieldAnalysisSection';
import { EnhancementBadge } from './EnhancementBadge';
import { ColumnVisibilityDropdown } from './ColumnVisibilityDropdown';
import { FilterState } from './TableFilters';

interface PaginatedTableProps {
  fields: FieldData[];
  filters: FilterState;
  columnVisibility: ColumnVisibilityState;
  onColumnVisibilityChange: (visibility: ColumnVisibilityState) => void;
  selectedFields: FieldData[];
  onFieldToggle: (field: FieldData) => void;
  onEditField: (field: FieldData) => void;
}

export const PaginatedTable: React.FC<PaginatedTableProps> = ({
  fields,
  filters,
  columnVisibility,
  onColumnVisibilityChange,
  selectedFields,
  onFieldToggle,
  onEditField
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Apply filters
  const filteredFields = useMemo(() => {
    return fields.filter(field => {
      // Field search filter
      if (filters.fieldSearch && !field.fieldPath.toLowerCase().includes(filters.fieldSearch.toLowerCase())) {
        return false;
      }
      
      // Has schema filter
      if (filters.hasSchema === 'yes' && field.hasSchema !== 'Yes') {
        return false;
      }
      if (filters.hasSchema === 'no' && field.hasSchema !== 'No') {
        return false;
      }
      
      // Policy action filter
      if (filters.policyAction !== 'All' && field.policyAction !== filters.policyAction) {
        return false;
      }
      
      return true;
    });
  }, [fields, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredFields.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFields = filteredFields.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            padding: '6px 10px',
            border: '1px solid #d1d5db',
            backgroundColor: i === currentPage ? '#10b981' : '#ffffff',
            color: i === currentPage ? '#ffffff' : '#374151',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500'
          }}
        >
          {i}
        </button>
      );
    }
    
    return pages;
  };

  const isFieldSelected = (field: FieldData) => {
    return selectedFields.some(f => f.id === field.id);
  };

  const tableHeaderStyle: React.CSSProperties = {
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151',
    padding: '12px 8px',
    textAlign: 'left'
  };

  const tableCellStyle: React.CSSProperties = {
    padding: '12px 8px',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '13px',
    color: '#1f2937',
    verticalAlign: 'top'
  };

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: '#ffffff'
    }}>
      {/* Header with column visibility */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151'
        }}>
          Showing {startIndex + 1}-{Math.min(endIndex, filteredFields.length)} of {filteredFields.length} fields
        </div>
        <ColumnVisibilityDropdown
          visibility={columnVisibility}
          onVisibilityChange={onColumnVisibilityChange}
        />
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '40px' }}>
                <input type="checkbox" style={{ width: '16px', height: '16px' }} disabled />
              </th>
              {columnVisibility.group && (
                <th style={tableHeaderStyle}>Group</th>
              )}
              <th style={tableHeaderStyle}>Field Path</th>
              {columnVisibility.value && (
                <th style={tableHeaderStyle}>Value</th>
              )}
              {columnVisibility.hasSchema && (
                <th style={tableHeaderStyle}>Has Schema</th>
              )}
              {columnVisibility.prodTag && (
                <th style={tableHeaderStyle}>Prod Tag</th>
              )}
              {columnVisibility.gcpTag && (
                <th style={tableHeaderStyle}>GCP Tag</th>
              )}
              {columnVisibility.deccTag && (
                <th style={tableHeaderStyle}>DECC Tag</th>
              )}
              {columnVisibility.attributedTo && (
                <th style={tableHeaderStyle}>Attributed To</th>
              )}
              {columnVisibility.dataSovereignty && (
                <th style={tableHeaderStyle}>Data Sovereignty</th>
              )}
              {columnVisibility.policyAction && (
                <th style={tableHeaderStyle}>Policy Action</th>
              )}
              {columnVisibility.enhancements && (
                <th style={tableHeaderStyle}>Enhancements</th>
              )}
              {columnVisibility.finding && (
                <th style={tableHeaderStyle}>Finding</th>
              )}
              {columnVisibility.comment && (
                <th style={tableHeaderStyle}>Comment</th>
              )}
              {columnVisibility.images && (
                <th style={tableHeaderStyle}>Images</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentFields.map((field) => (
              <tr
                key={field.id}
                style={{
                  backgroundColor: isFieldSelected(field) ? '#f0f9ff' : '#ffffff',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!isFieldSelected(field)) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isFieldSelected(field)) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                <td style={tableCellStyle}>
                  <input
                    type="checkbox"
                    checked={isFieldSelected(field)}
                    onChange={() => onFieldToggle(field)}
                    style={{ width: '16px', height: '16px', accentColor: '#10b981' }}
                  />
                </td>
                {columnVisibility.group && (
                  <td style={tableCellStyle}>
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '500'
                    }}>
                      {field.source} {field.category}
                    </span>
                  </td>
                )}
                <td style={tableCellStyle}>
                  <div style={{ fontWeight: '500' }}>{field.fieldPath}</div>
                </td>
                {columnVisibility.value && (
                  <td style={{ ...tableCellStyle, maxWidth: '200px' }}>
                    <div style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {field.value}
                    </div>
                  </td>
                )}
                {columnVisibility.hasSchema && (
                  <td style={tableCellStyle}>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: field.hasSchema === 'Yes' ? '#dcfce7' : '#fee2e2',
                      color: field.hasSchema === 'Yes' ? '#166534' : '#991b1b'
                    }}>
                      {field.hasSchema}
                    </span>
                  </td>
                )}
                {columnVisibility.prodTag && (
                  <td style={tableCellStyle}>{field.prodTag}</td>
                )}
                {columnVisibility.gcpTag && (
                  <td style={tableCellStyle}>{field.gcpTag}</td>
                )}
                {columnVisibility.deccTag && (
                  <td style={tableCellStyle}>{field.deccTag}</td>
                )}
                {columnVisibility.attributedTo && (
                  <td style={tableCellStyle}>{field.attributedTo}</td>
                )}
                {columnVisibility.dataSovereignty && (
                  <td style={tableCellStyle}>{field.dataSovereignty}</td>
                )}
                {columnVisibility.policyAction && (
                  <td style={tableCellStyle}>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '500',
                      backgroundColor: '#f3f4f6',
                      color: '#374151'
                    }}>
                      {field.policyAction}
                    </span>
                  </td>
                )}
                {columnVisibility.enhancements && (
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {field.enhancements.map((enhancement, idx) => (
                        <EnhancementBadge key={idx} enhancements={[enhancement]} />
                      ))}
                    </div>
                  </td>
                )}
                {columnVisibility.finding && (
                  <td style={tableCellStyle}>
                    {field.selectedFinding && (
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: '#fef3c7',
                        color: '#92400e'
                      }}>
                        {field.selectedFinding}
                      </span>
                    )}
                  </td>
                )}
                {columnVisibility.comment && (
                  <td style={tableCellStyle}>
                    {field.selectedComment?.text && (
                      <div style={{
                        maxWidth: '150px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {field.selectedComment.text}
                      </div>
                    )}
                  </td>
                )}
                {columnVisibility.images && (
                  <td style={tableCellStyle}>
                    {field.selectedComment?.images && field.selectedComment.images.length > 0 && (
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '500',
                        backgroundColor: '#e0e7ff',
                        color: '#3730a3'
                      }}>
                        {field.selectedComment.images.length} image(s)
                      </span>
                    )}
                  </td>
                )}
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
        padding: '12px 16px',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{
              padding: '4px 8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '12px',
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
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '6px 8px',
              border: '1px solid #d1d5db',
              backgroundColor: currentPage === 1 ? '#f9fafb' : '#ffffff',
              color: currentPage === 1 ? '#9ca3af' : '#374151',
              borderRadius: '4px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ChevronLeft size={14} />
            Previous
          </button>

          <div style={{ display: 'flex', gap: '4px' }}>
            {renderPageNumbers()}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '6px 8px',
              border: '1px solid #d1d5db',
              backgroundColor: currentPage === totalPages ? '#f9fafb' : '#ffffff',
              color: currentPage === totalPages ? '#9ca3af' : '#374151',
              borderRadius: '4px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};